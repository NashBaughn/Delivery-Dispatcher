var amqp = require('amqplib/callback_api');


exports.push_to_queue = (orderId) => {
	amqp.connect('amqp://localhost', function(err, conn) {
		conn.createChannel(function(err, ch) {	
			var q = process.env.BMG_RABBITMQ_QUEUE_NAME;
			console.log(process.env.BMG_DATABASE_NAME)
			ch.assertQueue(q ,{durable: false});
			ch.sendToQueue(q, new Buffer(orderId.toString()), {persistent: true});
			console.log("pushed to rabbit!")
		});
		setTimeout(function() { conn.close() }, 500);
		console.log("connection successfully closed!")
	});
}

exports.pull_from_queue = () => {
	console.log("pull from queue")
	return new Promise((resolve, reject) => {
		amqp.connect('amqp://localhost', function(err, conn) {
			if (err) { reject(err) }
			conn.createChannel(function(err, ch) {
				if (err) { reject(err) }
				var q = process.env.BMG_RABBITMQ_QUEUE_NAME;
				ch.assertQueue(q, {durable: false});
				ch.prefetch(1);
				ch.consume(q, function(msg) {
					console.log("msg:  "+msg.content)
					setTimeout(function() {
						console.log("done")
						ch.ack(msg)
						resolve(msg)
					}, 1000)
				}, {noAck: false});
			});
			//setTimeout(function() { conn.close() }, 500);
		});
	});
}

exports.start_dispatcher = () => {
	console.log("starting dispatcher")
	amqp.connect('amqp://localhost', function(err, conn) {
		conn.createChannel(function(err, ch) {
			var q = process.env.BMG_RABBITMQ_QUEUE_NAME;
			ch.assertQueue(q, {durable: false});
			ch.prefetch(1);
			ch.consume(q, function(msg) {
				setTimeout(function() {
					console.log("dispatching order: " + msg.content)
					ch.ack(msg)
				}, 1000)
			}, {noAck: false});
		});
		//setTimeout(function() { conn.close() }, 500);
	});
	
}

