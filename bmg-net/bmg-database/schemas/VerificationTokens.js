/* 

NOTE THIS IS JUST FOR EXAMPLE

*/

'use strict';

let connection = require('../connection')
const Sequelize = require('sequelize')

const Tokens = connection.define('tokens', {
	id: {
		type: Sequelize.UUID,
		primaryKey: true,
		autoIncrement:true
	},
	user: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.NOW
	}
});

module.exports = Tokens;
