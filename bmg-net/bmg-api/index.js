console.log("here * * *")
const express  = require('express');
const routes   = require('./routes/routes.js');
const db 	   = require('./database/db');
const app      = express();

routes(app);

module.exports.db = db;
module.exports.app = app;
module.exports.init = db.init;


