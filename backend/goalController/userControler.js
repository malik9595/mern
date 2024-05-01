const mongoose = require('mongoose');
const registerModel = require('../models/registerModel');
const asyncHander = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtTokenGenerator = require('../config/jwtTokenGenerator');


const register = asyncHander(async (req, res) => {
	const { username, email, password } = await req.body;
	if (!username || !email || !password) {
		res.status(400);
		throw new Error('Please add all feilds');
	}
	// check user exist
	const isUserExist = await registerModel.findOne({ email });
	console.log(isUserExist);
	if (isUserExist) {
		res.status(400);
		throw new Error('User already exist ');
	}

	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password.toString(), salt);
	const user = await new registerModel({
		username,
		email,
		password: hashPassword,
	}).save();
	if (user) {
		res.status(201).json({
			username: user.username,
			email: user.email,
			password: user.password,
			token: jwtTokenGenerator(user.id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

const login = asyncHander(async (req, res) => {
	const { email, password } = req.body;
	const user = await registerModel.findOne({ email });

	
	if (user && (await bcrypt.compare(password, user.password))) {
		const token = jwtTokenGenerator(user.id);
		res.status(200).json({ id: user.id, token,username:user.username });
	} else {
		res.status(400);
		throw new Error('Invalid credentials cc');
	}
});

module.exports = { register, login };
