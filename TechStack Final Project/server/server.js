const express = require('express');
const app = express();

require("dotenv").config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const { connect } = require('./impl/database/database');
connect();

const usersRouter = require('./impl/controllers/UsersController');
app.use('/users', usersRouter);

const rolesRouter = require('./impl/controllers/RolesController');
app.use('/roles', rolesRouter);

const jobsRouter = require('./impl/controllers/JobsController');
app.use('/jobs', jobsRouter);

const PORT = process.env.restPort
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});