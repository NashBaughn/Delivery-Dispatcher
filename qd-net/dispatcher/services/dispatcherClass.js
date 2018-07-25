'use strict';
var amqp = require('amqplib/callback_api');

function dispatcher(location, queue_name, queue_host) {
	var drivers  = [];
	var batch = {}

	function start() {
		console.log("starting dispatcher")
		batch.orders = [];
	 	var quantum = 1; //seconds
		var count = 0;

		amqp.connect(queue_host, function(err, conn) {
			conn.createChannel(function(err, ch) {	
				ch.assertQueue(queue_name, {durable: false});
				ch.prefetch(1);
				ch.consume(queue_name, function(msg) {
					var order_num = msg.content.toString();
					batch.orders.push(order_num);
					count++;
					ch.ack(msg);			
					console.log("* * * * * *")
					console.log(batch)
					// crude yet only temporary soultion for quatnum logic
					if (count==5){
						dispatch(batch)
						batch = {}
						batch.orders = [];
						count = 0;					
					}
				}, {noAck: false});	
			});
		});
	}

	return {
		location: location,
		drivers: drivers,
		start: start
	}
};

// busy wait
function dispatch(batch) {
	setTimeout( function() {
		for(var i=0; i<batch.orders.length; i++){
			console.log(batch.orders[i])
		}
	}, 3*1000)
}

module.exports = dispatcher;