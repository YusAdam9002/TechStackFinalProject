const express = require('express');
const router = express.Router();
const { okJSON, badJSON, badAuthJSON } = require('../database/database');
const bcrypt = require('bcrypt')
const repo = require('../repository/UsersRepository');

async function authenticate(req, res, next) {
    const token = req.headers.token;
    const authRes = await repo.UserAuthCheck(token)

    if (authRes[0].success) {
        next();
    } else {
        res.json(badAuthJSON());
    }
}

module.exports = {
    authenticate
};