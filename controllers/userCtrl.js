var mongoose = require('mongoose'),
	userModel = require('../models/User');

exports.getUsers = function(req, res) {
	userModel.find({ mail: req.body.mail, psw: req.body.psw }, function(err, doc) {
		if (err)
			res.send(err);
		res.json(doc);
	});
};

exports.setUser = function(req, res) {
	var guardauserModel = new userModel({
	});

	guardauserModel.save(function(err, alumno) {
		if (err)
			res.send(err);
		res.json(alumno);
	});
};