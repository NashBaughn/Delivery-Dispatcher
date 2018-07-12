'use strict';
var Orders = require('../../database/schemas').orders;
//var Drivers = require('../database/schemas').drivers;
var Sequelize = require('sequelize');
var Rabbit = require('./rabbitController');
var amqp = require('amqplib/callback_api');


exports.createOrder = function(req, res){
	console.log("new order")
	console.log(req.body.patientId)
	Orders.create({
		patientId: req.body.patientId,
		address: req.body.address,
	}).then((order) => {
		console.log("order: "+ order.id +" created!")
		//console.log(order)

		/* Push order to raabit mq */	
		Rabbit.push_to_queue(order.id)

		/* */
		res.status(200).send({status:"success", orderId:order.id})	

	}).catch((err) => {
		res.status(400).send({error:err})
		throw err;
	});

}

exports.readFromQueue = function(req, res){
	console.log("reading from queue")
	
	Rabbit.pull_from_queue()
	.then(function (fullfilled) {
		console.log("fullfilled")
	}).catch(function (error) {
		console.log("error")
	});
}
