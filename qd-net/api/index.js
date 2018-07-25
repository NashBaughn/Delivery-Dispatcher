const express  = require('express');
const routes   = require('./routes/routes.js');
const db 	   = require('../database/db');
const app      = express();
const Rabbit   = require('./controllers/rabbitController.js');

routes(app);

module.exports.db = db;
module.exports.app = app;
module.exports.init = db.init;

