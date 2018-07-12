const express  = require('express');
const db 	   = require('../bmg-database/db');
const app      = express();
const dispatcher = require('./services/dispatchService.js');

dispatcher.start()

module.exports.db = db;
module.exports.app = app;
module.exports.init = db.init;