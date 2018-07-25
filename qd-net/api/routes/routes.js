'use strict'

module.exports = function(app) {
	var controller = require('../controllers/mainController');

	app.route('/neworder')
		.post(controller.createOrder);

	app.route('/setorderstatus')
		.post(controller.setOrderStatus);

	app.route('/newdriver')
		.post(controller.createDriver);

	app.route('/currentorders')
		.post(controller.getIncompleteOrders)
};
