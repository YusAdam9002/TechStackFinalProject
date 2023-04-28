IF NOT EXISTS (SELECT name FROM master.sys.databases WHERE name = 'LoginDB')
BEGIN
    CREATE DATABASE LoginDB;
END
GO

USE [LoginDB]

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'users')
BEGIN
	CREATE TABLE users (
		id uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
		username varchar(255) NOT NULL,
		password varchar(255) NOT NULL,
		email varchar(255) NOT NULL,
		displayname varchar(255) NOT NULL,
		profilepictureurl varchar(max),
		role varchar(255),
		datecreated datetime NOT NULL DEFAULT GETDATE(),
		datelastlogin datetime
	);
END
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'userextension')
BEGIN
	CREATE TABLE userextension (
		id uniqueidentifier PRIMARY KEY,
		dob date,
		cv varchar(max),
		phonenumber varchar(20),
		skills varchar(max),
		education varchar(max),
		CONSTRAINT fk_userextension_user FOREIGN KEY (id) REFERENCES users(id)
	);
END
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'sessions')
BEGIN
	CREATE TABLE sessions (
		id int IDENTITY(1,1) PRIMARY KEY,
		token varchar(255) NOT NULL,
		expirydate datetime NOT NULL DEFAULT DATEADD(month, 3, GETDATE()),
		userid uniqueidentifier NOT NULL,
		CONSTRAINT fk_sessions_user FOREIGN KEY (userid) REFERENCES users(id)
	);
END
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'roles')
BEGIN
	CREATE TABLE roles (
		id int IDENTITY(1,1) PRIMARY KEY,
		name varchar(255) NOT NULL
	);
	insert roles(name) values ('Employer'), ('Student')
END
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'userassignment')
BEGIN
	CREATE TABLE userassignment (
		id UNIQUEIDENTIFIER NOT NULL,
		idassignedto UNIQUEIDENTIFIER NOT NULL,
		PRIMARY KEY (id, idassignedto)
	);
END
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'jobs')
BEGIN
	CREATE TABLE jobs (
		id int IDENTITY(1,1) PRIMARY KEY,
		createdby UNIQUEIDENTIFIER NOT NULL,
		title varchar(255),
		description varchar(max),
	);
END
GO

IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'applications')
BEGIN
	CREATE TABLE applications (
		id int IDENTITY(1,1) PRIMARY KEY,
		userapplying UNIQUEIDENTIFIER NOT NULL,
		jobid int,
		notes varchar(max),
		accepted bit
	);
END
GO

CREATE OR ALTER PROCEDURE UserCreate
    @username varchar(255),
    @password varchar(255),
	@email varchar(255),
    @displayname varchar(255),
    @profilepictureurl varchar(max) = NULL,
    @role varchar(255) = NULL
AS
BEGIN
    IF EXISTS (SELECT 1 FROM users WHERE username = @username)
    BEGIN
        RAISERROR('User with the same username already exists', 16, 1);
        RETURN;
    END
	
	IF EXISTS (SELECT 1 FROM users WHERE email = @email)
    BEGIN
        RAISERROR('User with the same email already exists', 16, 1);
        RETURN;
    END
	
    INSERT INTO users (username, password, email, displayname, profilepictureurl, role)
    VALUES (@username, @password, @email, @displayname, @profilepictureurl, @role);

	SELECT SCOPE_IDENTITY() AS userid;
END;
GO

CREATE OR ALTER PROCEDURE UserLogin
    @username varchar(255)
AS
BEGIN
    -- Check if username and password are valid
    IF NOT EXISTS (SELECT 1 FROM users WHERE username = @username)
    BEGIN
        RAISERROR('Invalid Username', 16, 1);
        RETURN;
    END

    -- Generate token
    DECLARE @token varchar(255) = CONCAT(NEWID(),NEWID(),NEWID(),NEWID(),NEWID(),NEWID(),NEWID(), NEWID());
	DECLARE @id varchar(255) = (SELECT id FROM users WHERE username = @username)
	DECLARE @role varchar(255) = (SELECT role FROM users WHERE username = @username)

    -- Insert session record
    INSERT INTO sessions (userid, token)
    VALUES (@id, @token);

    -- Return token
    SELECT 
		@token AS token, 
		@id AS id,
		@role AS role;
END;
GO

CREATE OR ALTER PROCEDURE UserGetAll
AS
BEGIN
    SELECT id, displayname, email, role, datelastlogin
    FROM users;
END;
GO

CREATE OR ALTER PROCEDURE RolesGetAll
AS
BEGIN
    SELECT * FROM roles;
END;
GO

CREATE OR ALTER PROCEDURE UserGetByID
    @id uniqueidentifier
AS
BEGIN
    SELECT * FROM users WHERE id = @id;
END;
GO

CREATE OR ALTER PROCEDURE UserGetExtensionDataByID
    @id uniqueidentifier
AS
BEGIN
    SELECT * FROM userextension WHERE id = @id;
END;
GO

CREATE OR ALTER PROCEDURE UserSetExtensionDataByID
    @id uniqueidentifier,
	@displayname varchar(255),
	@profilepictureurl varchar(max),
    @dob date = NULL,
    @cv varchar(max) = NULL,
    @phonenumber varchar(20) = NULL,
	@skills varchar(max) = NULL,
	@education varchar(max) = NULL
AS
BEGIN
    MERGE userextension AS target
    USING (VALUES (@id, @dob, @cv, @phonenumber, @skills, @education)) AS source(id, dob, cv, phonenumber, skills, education)
    ON target.id = source.id
    WHEN MATCHED THEN
        UPDATE SET 
            dob = COALESCE(source.dob, target.dob),
            cv = COALESCE(source.cv, target.cv),
            phonenumber = COALESCE(source.phonenumber, target.phonenumber),
            skills = COALESCE(source.skills, target.skills),
			education = COALESCE(source.education, target.education)
    WHEN NOT MATCHED THEN
        INSERT (id, dob, cv, phonenumber, skills, education) VALUES (
			@id, 
			@dob, 
			@cv, 
			@phonenumber, 
			@skills,
			@education
		);


	UPDATE users set
		profilepictureurl = @profilepictureurl,
		displayname = @displayname
	WHERE id = @id
END;
GO

CREATE OR ALTER PROCEDURE UserSearch
    @filter varchar(255)
AS
BEGIN
    SELECT
		cv,
		datecreated,
		datelastlogin,
		displayname,
		dob,
		education,
		email,
		ue.id,
		password,
		phonenumber,
		profilepictureurl,
		role,
		skills,
		username
    FROM users u
    INNER JOIN userextension ue ON u.id = ue.id
    WHERE
		u.role = 2 AND (
		@filter IS NULL OR (
			u.displayname LIKE '%' + @filter + '%'
			OR u.email LIKE '%' + @filter + '%'
			OR ue.dob LIKE '%' + @filter + '%'
			OR ue.phonenumber LIKE '%' + @filter + '%'
			OR ue.skills LIKE '%' + @filter + '%'
			OR ue.education LIKE '%' + @filter + '%'
		));
END;
GO

CREATE OR ALTER PROCEDURE UserGetPass
    @username varchar(255)
AS
BEGIN
    SELECT 
		password
    FROM 
		users
	WHERE
		username = @username
END;
GO

CREATE OR ALTER PROCEDURE UserAssign
  @user varchar(255),
  @userassignedto varchar(255),
  @mode VARCHAR(10)
AS
BEGIN
  IF @mode = 'add'
    BEGIN
      INSERT INTO userassignment (id, idassignedto)
      VALUES (@user, @userassignedto);
    END
  ELSE IF @mode = 'delete'
    BEGIN
      DELETE FROM userassignment
      WHERE id = @user AND idassignedto = @userassignedto;
    END
END;
GO

CREATE OR ALTER PROCEDURE UserGetAssigned
	@user varchar(255)
AS
BEGIN
	SELECT 
		ua.id AS id,
		ua.idassignedto AS idassignedto,
		us.displayname AS userdisplayname,
		us1.displayname AS userassignedtodisplyname
	FROM userassignment ua
	left join users us ON us.id = ua.id
	left join users us1 on us1.id = ua.idassignedto
	WHERE ua.id = @user;
END;
GO

CREATE OR ALTER PROCEDURE EmployerGetAssigned
	@user varchar(255)
AS
BEGIN
	SELECT 
		ua.id AS id,
		ua.idassignedto AS idassignedto,
		us.displayname AS userdisplayname,
		us1.displayname AS userassignedtodisplyname
	FROM userassignment ua
	left join users us ON us.id = ua.id
	left join users us1 on us1.id = ua.idassignedto
	WHERE ua.idassignedto = @user;
END;
GO

CREATE OR ALTER PROCEDURE UserAuthCheck
	@token varchar(max)
AS
BEGIN
	IF EXISTS (SELECT TOP 1 * FROM sessions WHERE token = @token)
		BEGIN
			select 1 'success'
		END
	ELSE
		BEGIN
			select 0 'success'
		END
END;
GO

CREATE OR ALTER PROCEDURE UserGetNotifications
	@user varchar(255)
AS
BEGIN
	SELECT *
	FROM userassignment
	WHERE idassignedto = @user;
END;
GO


-- Create endpoints for these
CREATE OR ALTER PROCEDURE JobsGetApplications
	@id int
AS
BEGIN
	SELECT 
		app.*, 
		us.displayname 
	FROM 
		applications app
	INNER JOIN 
		users us ON app.userapplying = us.id
	WHERE jobid = @id
END
GO

CREATE OR ALTER PROCEDURE ApplicationsAddUpdate
	@id int = NULL,
	@apply bit,
	@userapplying UNIQUEIDENTIFIER = NULL,
	@jobid int,
	@notes varchar(max),
	@accepted bit = null
AS
BEGIN
	IF (@apply = 0)
	BEGIN
		DELETE FROM applications WHERE id = @id
	END
	ELSE IF (@id IS NULL)
		BEGIN
			INSERT applications (
				userapplying,
				jobid,
				notes,
				accepted
			) 
			VALUES (
				@userapplying,
				@jobid,
				@notes,
				@accepted
			)
		END
	ELSE
		BEGIN
			UPDATE applications SET
				userapplying = @userapplying,
				jobid = @jobid,
				notes = @notes,
				accepted = @accepted
			WHERE id = @id
		END
END
GO

CREATE OR ALTER PROCEDURE JobsFilter
    @filter varchar(max) = NULL,
	@userid UNIQUEIDENTIFIER = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
		jb.id,
		jb.createdby,
		jb.description,
		jb.title,
		us.displayname
    FROM jobs jb
	LEFT JOIN users us ON us.id = jb.createdby
    WHERE (@userid IS NULL or jb.createdby = @userid) AND (@filter IS NULL OR (title LIKE '%' + @filter + '%' OR description LIKE '%' + @filter + '%' OR us.displayname LIKE '%' + @filter + '%'));
END
GO

CREATE OR ALTER PROCEDURE JobAddUpdate
   @id int = null,
   @userid UNIQUEIDENTIFIER,
   @title varchar(255),
   @description varchar(max)
AS
BEGIN
	IF (@id IS NULL)
		BEGIN
			INSERT jobs (
				createdby,
				title,
				description
			) 
			VALUES (
				@userid,
				@title,
				@description
			)
		END
	ELSE
		BEGIN
			UPDATE jobs SET
				title = @title,
				description = @description
			WHERE id = @id
		END
END
GO