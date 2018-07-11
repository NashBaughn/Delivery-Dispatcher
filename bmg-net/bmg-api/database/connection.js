'use strict';

const Sequelize = require('sequelize');

var database_name = "bmg_test_api";
var database_username = "bob";
var database_password = "bobob";


const connection = new Sequelize(database_name, database_username, database_password, {
	host: 'localhost',
	port: 5000,
	dialect: 'postgres',
	// dialectOptions: {
	// 	ssl: true,
	// 	native: true,
	// },
	pool: {
	  max: 5,
	  min: 0,
	  idle: 10000,
	}
});

module.exports = connection;
