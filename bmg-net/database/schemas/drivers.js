'use strict';

let connection = require('../connection')
const Sequelize = require('sequelize')

const drivers = connection.define('drivers',  {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement:true
	},
	dl: {
		type: Sequelize.STRING,
	},
	status: {
		type: Sequelize.STRING,
		defaultValue: 'off'
	},
	createdAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	updatedAt: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
});


module.exports.drivers = drivers;
