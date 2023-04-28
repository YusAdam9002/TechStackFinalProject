const express = require('express');
const repo = require('../repository/JobsRepository');
const router = express.Router();
const { okJSON, badJSON } = require('../database/database');
const authRepo = require('../repository/AuthRepository')

router.get('/GetApplications/:jobid', authRepo.authenticate, async (req, res) => {
    try {
        const jobid = req.params.jobid;
        const data = await repo.JobsGetApplications(jobid);
        res.json(okJSON('Success', data));
    } catch (err) {
        res.json(badJSON('Error'));
    }
});

router.post('/SetApplications', authRepo.authenticate, async (req, res) => {
    try {
        const { id, userapplying, jobid, notes, accepted, apply } = req.body;
        const data = await repo.ApplicationsAddUpdate(id, userapplying, jobid, notes, accepted, apply);
        res.json(okJSON('Success', data));
    } catch (err) {
        res.json(badJSON('Error'));
    }
});

router.get('/filteremployerjobs/:userid/:filter', authRepo.authenticate, async (req, res) => {
    try {
        const { userid, filter } = req.params;
        const data = await repo.JobsFilter(filter, userid);
        res.json(okJSON('Success', data));
    } catch (err) {
        res.json(badJSON('Error'));
    }
});

router.get('/filteremployerjobs/:userid', authRepo.authenticate, async (req, res) => {
    try {
        const { userid } = req.params;
        const data = await repo.JobsFilter(null, userid);
        res.json(okJSON('Success', data));
    } catch (err) {
        res.json(badJSON('Error'));
    }
});

router.get('/filterjobs/:filter', authRepo.authenticate, async (req, res) => {
    try {
        const filter = req.params.filter;
        const data = await repo.JobsFilter(filter);
        res.json(okJSON('Success', data));
    } catch (err) {
        res.json(badJSON('Error'));
    }
});

router.get('/filterjobs/', authRepo.authenticate, async (req, res) => {
    try {
        const data = await repo.JobsFilter(null);
        res.json(okJSON('Success', data));
    } catch (err) {
        res.json(badJSON('Error'));
    }
});

router.post('/SetJobs', authRepo.authenticate, async (req, res) => {
    try {
        const { id, userid, title, description } = req.body;
        const data = await repo.JobAddUpdate(id, userid, title, description);
        res.json(okJSON('Success', data));
    } catch (err) {
        res.json(badJSON('Error'));
    }
});

module.exports = router;