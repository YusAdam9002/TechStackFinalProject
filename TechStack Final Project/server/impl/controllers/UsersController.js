const express = require('express');
const router = express.Router();
const repo = require('../repository/UsersRepository');
const { okJSON, badJSON, badAuthJSON } = require('../database/database');
const bcrypt = require('bcrypt')
const authRepo = require('../repository/AuthRepository')

router.get('/list', authRepo.authenticate, async (req, res) => {
  try {
    const users = await repo.UserGetAll();
    res.json(okJSON('successfully gathered user data', users));
  } catch (err) {
    res.json(badJSON('error getting user data'));
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPass = await repo.UserGetPass(username);
    const correct = await bcrypt.compare(password, hashedPass);

    if (correct) {
      const data = await repo.UserLogin(username);
      res.json(okJSON('successfully logged in', data));
    } else {
      res.json(badJSON('incorrect username or password'));
    }

  } catch (err) {
    res.json(badJSON('incorrect username or password'));
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, email, displayname, profilepictureurl, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)

    const userid = await repo.UserCreate(username, hashedPassword, email, displayname, profilepictureurl, role);
    res.json(okJSON('successfully registered', userid));
  } catch (err) {
    res.json(badJSON('user with that email or username already exists or invalid data'));
  }
});

router.get('/usersearch/:filter', authRepo.authenticate, async (req, res) => {
  try {
    const filter = req.params.filter;
    const users = await repo.UserSearch(filter);
    res.json(okJSON('successfully gathered user data', users));
  } catch (err) {
    res.json(badJSON('failed to gather user data'));
  }
});

router.get('/usersearch', authRepo.authenticate, async (req, res) => {
  try {
    const users = await repo.UserSearch(null);
    res.json(okJSON('successfully gathered user data', users));
  } catch (err) {
    res.json(badJSON('failed to gather user data'));
  }
});

router.get('/getbyid/:id', authRepo.authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await repo.UserGetByID(id);
    res.json(okJSON('successfully gathered user core data', user));
  } catch (err) {
    res.json(badJSON('error getting user core data'));
  }
});

router.get('/GetExtensionByID/:id', authRepo.authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await repo.UserGetExtensionDataByID(id);
    res.json(okJSON('successfully gathered user extension data', user));
  } catch (err) {
    res.json(badJSON('error getting user extension data'));
  }
});

router.post('/SetExtensionByID', authRepo.authenticate, async (req, res) => {
  try {
    const { id, displayname, profilepictureurl, dob, cv, phonenumber, skills, education } = req.body;
    const userid = await repo.UserSetExtensionDataByID(id, displayname, profilepictureurl, dob, cv, phonenumber, skills, education);
    res.json(okJSON('successfully set extension data', userid));
  } catch (err) {
    res.json(badJSON('failed to set extension data'));
  }
});

router.post('/assign', authRepo.authenticate, async (req, res) => {
  try {
    const { user, userassignedto, mode } = req.body;
    const data = await repo.UserAssign(user, userassignedto, mode);
    res.json(okJSON('successfully assigned user', data));
  } catch (err) {
    res.json(badJSON('unable to assign user'));
  }
});

router.get('/getassigned/:id', authRepo.authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await repo.UserGetAssigned(id);
    res.json(okJSON('successfully gathered user assignments', data));
  } catch (err) {
    res.json(badJSON('error getting user assignments'));
  }
});

router.get('/getassignedemployer/:id', authRepo.authenticate, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await repo.EmployerGetAssigned(id);
    res.json(okJSON('successfully gathered user assignments', data));
  } catch (err) {
    res.json(badJSON('error getting user assignments'));
  }
});

module.exports = router;