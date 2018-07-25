'use strict';

let connection = require('../connection')
const Sequelize = require('sequelize')

const patients = connection.define('patients',  {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement:true
	},
	patientId: {
		type: Sequelize.STRING,
	},
	status: {
		type: Sequelize.STRING,
		defaultValue: 'verified'
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


module.exports = patients;
