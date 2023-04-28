const sql = require('mssql');

const config = {
    user: process.env.dbUser,
    password: process.env.dbPassword,
    database: process.env.dbDatabase,
    server: process.env.dbServer,
    options: {
        encrypt: false,
        trustServerCertificate: true
      }
};

const pool = new sql.ConnectionPool(config);

async function connect() {
    try {
        await pool.connect();
        console.log('Database connected!');
    } catch (err) {
        console.log('Database connection error:', err);
    }
}

async function executeSP(name, params) {
    try {
        const request = pool.request();
        Object.keys(params).forEach(key => {
            request.input(key, params[key].type, params[key].value);
        });
        const result = await request.execute(name);
        return result.recordset;
    } catch (err) {
        console.error('Error running stored procedure:', err);
        throw err;
    }
}

const okJSON = (msg, data) => {
    return { success: true, msg: msg, data: data, auth: true };
}

const badJSON = (msg) => {
    return { success: false, msg: msg, auth: true };
}

const badAuthJSON = () => {
    return { success: false, msg: 'not authenticated', auth: false };
}

module.exports = {
    okJSON,
    badJSON,
    executeSP,
    connect,
    pool,
    badAuthJSON
};