const express  = require('express');
const routes   = require('./routes/routes.js');
const db 	   = require('./database/db');
const app      = express();
const Rabbit   = require('./controllers/rabbitController.js');


routes(app);

/* Uncomment to merge api and dispatcher into single service */
/* I just believe they should be sperated entirely */
// Rabbit.start_dispatcher();

module.exports.db = db;
module.exports.app = app;
module.exports.init = db.init;

