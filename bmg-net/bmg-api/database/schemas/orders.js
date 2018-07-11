'use strict';

let connection = require('../connection')
const Sequelize = require('sequelize')

const orders = connection.define('orders', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement:true
	},
	patientId: {
		type: Sequelize.STRING,
	},
	address: {
		type: Sequelize.STRING,
	},
	status: {
		type: Sequelize.STRING,
		defaultValue: 'created'
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

module.exports = orders;
