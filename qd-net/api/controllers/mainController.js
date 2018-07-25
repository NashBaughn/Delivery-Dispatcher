'use strict';
const Orders = require('../../database/schemas').orders;
const Drivers = require('../../database/schemas').drivers;
const Sequelize = require('sequelize');
const Rabbit = require('./rabbitController');
const amqp = require('amqplib/callback_api');
const Op = Sequelize.Op;

exports.createOrder = function(req, res){
	console.log("new order")

	Orders.create({
		patientId: req.body.patientid,
		address: req.body.address,
	}).then((order) => {
		console.log("order: "+ order.id +" created!")	
		Rabbit.push_to_queue(req.body.queuename, order.id);
		res.status(200).send({status:"success", orderId:order.id});	
	}).catch((err) => {
		res.status(400).send({error:err});
		throw err;
	});
}

exports.setOrderStatus = function(req, res){
	console.log("set order status")

	Orders.find({
		where:{
			id: req.body.orderid
		}
	}).then((order) => {
		console.log(order)
		if (order == null){
			res.status(404).send({status:"error", msg:"Id does not exists"});
		} else {
			order.updateAttributes({
				status: req.body.status
			})
			res.status(200).send({status:"success"});
		}
	}).catch((err) => {
		res.status(400).send({error:err});
		throw err;
	});
}

exports.createDriver = function(req, res){
	console.log("creating driver")

	Drivers.create({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		dl: req.body.dl,
		car: req.body.car
	}).then((driver) => {
		res.status(200).send({status:"success", driverId:driver.id});	
	}).catch((err) => {
		res.status(400).send({error:err});
		throw err;
	});
}

exports.getIncompleteOrders = function(req, res){
	console.log("get incomplete orders")

	Orders.findAll({
		where:{
			status: {
				[Op.ne]: "delivered"
			}
		}
	}).then((orders) => {
		res.status(200).send({status:"success", incompleteOrders:orders});	
	}).catch((err) => {
		res.status(400).send({error:err});
		throw err;
	});
}