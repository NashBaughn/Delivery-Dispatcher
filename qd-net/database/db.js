'use strict';

let connection = require('./connection');
let schemas = require('./schemas');
let setRelations = require('./relations');

let db = {
	init: () => {
		return new Promise((fullfill, reject) => {
			connection.authenticate()
			.then(() => {
				setRelations()
				connection.sync()
				.then(() => {
					fullfill()
				})
				.catch(reject)
			})
			.catch(reject)
		})
	}
};

module.exports = Object.assign(db, schemas);
