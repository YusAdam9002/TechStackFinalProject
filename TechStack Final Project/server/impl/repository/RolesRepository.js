const pool = require('../database/database').pool;
const executeSP = require('../database/database').executeSP;
const sql = require('mssql');

async function RolesGetAll() {
    try {
        const result = await executeSP('RolesGetAll', {});
        return result;
    } catch (err) {
        console.log('error getting roles:', err);
        throw err;
    }
}

module.exports = {
    RolesGetAll
};