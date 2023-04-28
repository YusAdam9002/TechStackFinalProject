const pool = require('../database/database').pool;
const executeSP = require('../database/database').executeSP;
const sql = require('mssql');

async function UserGetAll() {
    try {
        const result = await executeSP('UserGetAll', {});
        return result;
    } catch (err) {
        console.log('error getting user:', err);
        throw err;
    }
}

async function UserCreate(username, password, email, displayname, profilepictureurl, role) {
    try {
        const data = {
            username: { type: sql.NVarChar(255), value: username },
            password: { type: sql.NVarChar(255), value: password },
            email: { type: sql.NVarChar(255), value: email },
            displayname: { type: sql.NVarChar(255), value: displayname },
            profilepictureurl: { type: sql.NVarChar('max'), value: profilepictureurl },
            role: { type: sql.NVarChar(255), value: role },
        }
        const result = await executeSP('UserCreate', data);
        return result;
    } catch (err) {
        console.log('error creating user:', err);
        throw err;
    }
}

async function UserLogin(username) {
    try {
        const data = {
            username: { type: sql.VarChar(255), value: username }
        }
        const result = await executeSP('UserLogin', data);
        return result;
    } catch (err) {
        console.log('Error logging in', err);
        throw err;
    }
}

async function UserGetPass(username) {
    try {
        const data = {
            username: { type: sql.VarChar(255), value: username }
        }
        const result = await executeSP('UserGetPass', data);
        return result[0].password;
    } catch (err) {
        console.log('Could not get user hashed password', err);
        throw err;
    }
}

async function UserGetByID(id) {
    try {
        const data = {
            id: { type: sql.VarChar(255), value: id }
        }
        const result = await executeSP('UserGetByID', data);
        return result;
    } catch (err) {
        console.log('Error getting user by id', err);
        throw err;
    }
}

async function UserGetExtensionDataByID(id) {
    try {
        const data = {
            id: { type: sql.VarChar(255), value: id }
        }
        const result = await executeSP('UserGetExtensionDataByID', data);
        return result;
    } catch (err) {
        console.log('Error getting user extension data', err);
        throw err;
    }
}

async function UserSetExtensionDataByID(id, displayname, profilepictureurl, dob, cv, phonenumber, skills, education) {
    try {
        const data = {
            id: { type: sql.VarChar(255), value: id },
            displayname: { type: sql.VarChar(255), value: displayname },
            profilepictureurl: { type: sql.VarChar('max'), value: profilepictureurl },
            dob: { type: sql.Date, value: dob },
            cv: { type: sql.VarChar('max'), value: cv },
            phonenumber: { type: sql.VarChar(20), value: phonenumber },
            skills: { type: sql.VarChar(255), value: skills },
            education: { type: sql.VarChar(255), value: education },
        }
        const result = await executeSP('UserSetExtensionDataByID', data);
        return result;
    } catch (err) {
        console.log('Error setting user extension data', err);
        throw err;
    }
}

async function UserSearch(filter) {
    try {
        const data = {
            filter: { type: sql.VarChar(255), value: filter }
        }
        const result = await executeSP('UserSearch', data);
        return result;
    } catch (err) {
        console.log('error searching for users', err);
        throw err;
    }
}

async function UserAssign(user, userassignedto, mode) {
    try {
        const data = {
            user: { type: sql.VarChar(255), value: user },
            userassignedto: { type: sql.VarChar(255), value: userassignedto },
            mode: { type: sql.VarChar(10), value: mode }
        }
        const result = await executeSP('UserAssign', data);
        return result;
    } catch (err) {
        console.log('error assigning users', err);
        throw err;
    }
}

async function UserGetAssigned(user) {
    try {
        const data = {
            user: { type: sql.VarChar(255), value: user }
        }
        const result = await executeSP('UserGetAssigned', data);
        return result;
    } catch (err) {
        console.log('error searching for user assignments', err);
        throw err;
    }
}

async function EmployerGetAssigned(user) {
    try {
        const data = {
            user: { type: sql.VarChar(255), value: user }
        }
        const result = await executeSP('EmployerGetAssigned', data);
        return result;
    } catch (err) {
        console.log('error searching for user assignments', err);
        throw err;
    }
}

async function UserAuthCheck(token) {
    try {
        const data = {
            token: { type: sql.VarChar('max'), value: token }
        }
        const result = await executeSP('UserAuthCheck', data);
        return result;
    } catch (err) {
        console.log('error grabbing token', err);
        throw err;
    }
}

module.exports = {
    EmployerGetAssigned,
    UserGetAll,
    UserCreate,
    UserLogin,
    UserGetByID,
    UserGetExtensionDataByID,
    UserSetExtensionDataByID,
    UserSearch,
    UserGetPass,
    UserAssign,
    UserGetAssigned,
    UserAuthCheck
};