const express = require('express');
const repo = require('../repository/RolesRepository');
const router = express.Router();
const { okJSON, badJSON } = require('../database/database');

router.get('/list', async (req, res) => {
  try {
    const roles = await repo.RolesGetAll();
    res.json(okJSON('successfully gathered role data', roles));
  } catch (err) {
    res.json(badJSON('failed to gather role data'));
  }
});

module.exports = router;