'use strict';
var amqp = require('amqplib/callback_api');

	// current batch stored in memory (wont get to big hopefully
	// quantum can be dynamic

	// var batch{}
	//consume loop
		// while(quantum)
			// consume order
			// batch = bee_algo(order, batch)
		// dispatch(batch) promise


exports.start = () => {
	console.log("starting dispatcher")
	var q = process.env.BMG_RABBITMQ_QUEUE_NAME;
	var batch = {};
	var quantum = 1; //seconds

	amqp.connect('amqp://localhost', function(err, conn) {
		conn.createChannel(function(err, ch) {	
			ch.assertQueue(q, {durable: false});
			ch.prefetch(1);
			console.log("- - - -")
			setTimeout(function() {
				ch.consume(q, function(msg) {
					console.log("dequeued order: "+msg.content)
					//batch = Bee.calc(batch, msg.content)
					ch.ack(msg)		
				}, {noAck: false});	

			}, 1000 * quantum)
			waitDispatch()
		});
		//setTimeout(function() { conn.close() }, 500);
	});
}

var waitDispatch = function () {
	dispatch
		.then(function (fullfilled) {
			console.log("success * * * * *")
			console.log(fullfilled)
		})
		.catch(function (error) {
			console.log("error")
		});
}

var dispatch = new Promise(
	function(resolve, reject) {
		setTimeout(function() {
			console.log("DISPATCHING!!!")	
		}, 1000 * 5)
		resolve("dispatched")	
	}

	
)