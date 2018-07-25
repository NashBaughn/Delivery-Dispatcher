'use strict';

const Sequelize = require('sequelize');

var database_name     = process.env.BMG_DATABASE_NAME;
var database_username = process.env.BMG_DATABASE_USERNAME;
var database_password = process.env.BMG_DATABASE_PASSWORD;

const connection = new Sequelize(database_name, database_username, database_password, {
	host: 'localhost',
	port: 5000,
	dialect: 'postgres',
	pool: {
	  max: 5,
	  min: 0,
	  idle: 10000,
	}
});

module.exports = connection;
