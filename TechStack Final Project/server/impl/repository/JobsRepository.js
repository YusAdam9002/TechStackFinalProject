const pool = require('../database/database').pool;
const executeSP = require('../database/database').executeSP;
const sql = require('mssql');

async function JobsGetApplications(jobid) {
    try {
        const data = {
            id: { type: sql.Int, value: jobid },
        }
        const result = await executeSP('JobsGetApplications', data);
        return result;
    } catch (err) {
        console.log('error getting applications:', err);
        throw err;
    }
}

async function ApplicationsAddUpdate(id, userapplying, jobid, notes, accepted, apply) {
    try {
        const data = {
            id: { type: sql.Int, value: id },
            userapplying: { type: sql.UniqueIdentifier, value: userapplying },
            jobid: { type: sql.Int, value: jobid },
            notes: { type: sql.VarChar('MAX'), value: notes },
            accepted: { type: sql.Bit, value: accepted },
            apply: { type: sql.Bit, value: apply }
        }
        const result = await executeSP('ApplicationsAddUpdate', data);
        return result;
    } catch (err) {
        console.log('error getting applications:', err);
        throw err;
    }
}

async function JobsFilter(filter, userid) {
    try {
        const data = {
            filter: { type: sql.VarChar('max'), value: filter },
            userid: { type: sql.UniqueIdentifier, value: userid }
        }
        const result = await executeSP('JobsFilter', data);
        return result;
    } catch (err) {
        console.log('error getting jobs:', err);
        throw err;
    }
}

async function JobAddUpdate(id, userid, title, description) {
    try {
        const data = {
            id: { type: sql.Int, value: id },
            userid: { type: sql.UniqueIdentifier, value: userid },
            title: { type: sql.VarChar(255), value: title },
            description: { type: sql.VarChar('max'), value: description }
        }
        const result = await executeSP('JobAddUpdate', data);
        return result;
    } catch (err) {
        console.log('error adding or updating jobs:', err);
        throw err;
    }
}


module.exports = {
    JobsGetApplications,
    ApplicationsAddUpdate,
    JobsFilter,
    JobAddUpdate
};