const amqp = require('amqplib/callback_api');

exports.push_to_queue = (queue_name, orderId) => {
	amqp.connect('amqp://localhost', function(err, conn) {
		conn.createChannel(function(err, ch) {	
			ch.assertQueue(queue_name ,{durable: false});
			ch.sendToQueue(queue_name, new Buffer(orderId.toString()), {persistent: true});
			console.log("pushed to rabbit!")
		});
		setTimeout(function() { conn.close() }, 500);
		console.log("connection successfully closed!")
	});
}