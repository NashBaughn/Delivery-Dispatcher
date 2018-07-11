'use strict'

module.exports = function(app) {
	var controller = require('../controllers/mainController');

	app.route('/neworder')
		.post(controller.createOrder);

	app.route('/nextorder')
		.post(controller.readFromQueue);
};
