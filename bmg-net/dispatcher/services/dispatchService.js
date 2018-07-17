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
	batch.orders = [];
 	var quantum = 1; //seconds
	var count = 0;
	var order_num; 

	amqp.connect('amqp://localhost', function(err, conn) {
		conn.createChannel(function(err, ch) {	
			ch.assertQueue(q, {durable: false});
			ch.prefetch(1);
			console.log("- - - -")
			ch.consume(q, function(msg) {
				order_num = msg.content.toString();
				console.log("dequeued order: "+order_num)			
				console.log("message count: "+count)
				batch.orders.push(order_num)
				console.log("current batch: ")
				console.log(batch)
				count++
				ch.ack(msg)

				if (count==2){
					dispatch(batch)
					batch = {}
					batch.orders = [];
					count = 0;
				}

			}, {noAck: false});	
			
		});
		//setTimeout(function() { conn.close() }, 500);
	});
}


function dispatch(batch) {
	setTimeout( function() {
		for(var i=0; i<batch.orders.length; i++){
			console.log(batch.orders[i])
		}
	}, 3*1000)
}

// var waitDispatch = function () {
// 	dispatch
// 		.then(function (fullfilled) {
// 			console.log("success * * * * *")
// 			console.log(fullfilled)
// 		})
// 		.catch(function (error) {
// 			console.log("error")
// 		});
// }

// var dispatch = new Promise(
// 	function(resolve, reject) {
		
// 		setTimeout(function() {
// 			console.log("DISPATCHING!!!")	
// 			resolve("dispatched")
// 		}, 1000 * 5)
			
// 	}	
// )