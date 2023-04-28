
# PLCMNT ReadMe

This is a project for the University job board application. This will help connect prospective employers with students. This system will cateer towards both kind of users. From the point of view of the company, it enables the searching and browing of student proofiles. From the students point of view, it enables the creation of a profile, including but not limited to a photograph, personal information, summary of key skills and timeline for their academic and work experience.

NPM Version:
9.5.0

NODE Version:
v18.15.0

## Setup Guide
### SQL
1) Download and install Microsoft SQL Server and Microsoft SQL Server Management Studio
2) Setup user account with SQL authentication credentials and normal permissions
3) Right click server -> properties
- -> connection - Make note of **server name**
- -> connection - Enable remote connections
4) Open Sql Server Configuration Manager.
- Select Sql Server Netwoork Configuration -> Protocols
- Right click TCP/IP -> Enable
- Right click TCP/IP -> Properties -> IPALL -> make note of **port**
- Execute Setup.sql in SQL folder

### Server
- Move into server folder: `cd server` 
- Install Dependencies: `npm install`
- Modify .env with SQL credentials and server info from SQL step
- Use LoginDB as database unless modified in SQL script


### Client
- Move into client folder: `cd client` 
- Install Dependencies: `npm install`
- Start server: `npm run dev`