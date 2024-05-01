const mongoose = require('mongoose');
const goalModel = require('../models/goalModel');
const registerModel = require('../models/registerModel');
const asyncHandeler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const getGoal = asyncHandeler(async (req, res) => {
	const goalData = await goalModel.find({ user: req.user.id });
	const userData = await registerModel.findById( req.user.id);
	res.status(200).json({userData,goalData});
});



const postGoal = asyncHandeler(async (req, res) => {
	token = req.headers.authorization.split(' ')[1];
	const decode = jwt.verify(token, process.env.JWT_SECRET);
	const { title, desc } = await req.body;
	if (!title || !desc) {
		res.status(400);
		throw new Error('please add all feilds');
	}

	await goalModel.create({ title, desc, user: decode.id });
	res.status(201).json({ title, desc });
});

const updateGoal = asyncHandeler(async (req, res) => {
	const goal = await goalModel.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error('goal not found');
	}

	const user = await registerModel.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}
	if (goal.user.toString() !== user.id) {
		res.status(400);
		throw new Error('User not authorized');
	}
	await goalModel.findByIdAndUpdate(req.params.id, {
		...req.body,
	});
	res.status(201).json({
		mess: 'updated',
	});
});

const deleteGoal = asyncHandeler(async (req, res) => {
	const goal = await goalModel.findById(req.params.id);
	if (!goal) {
		res.status(400);
		throw new Error('goal not found');
	}

	const user = await registerModel.findById(req.user.id);
	if (!user) {
		res.status(401);
		throw new Error('User not found && not Login');
	}
	if (goal.user.toString() !== user.id) {
		res.status(400);
		throw new Error('User not authorized');
	}
	await goalModel.findByIdAndDelete(req.params.id);
	res.status(200).json({ mess: 'Deleted' });
});

module.exports = { getGoal, postGoal, updateGoal, deleteGoal };
