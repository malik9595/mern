const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const registerModel = require('../models/registerModel');

const authMidleware = asyncHandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			req.user = await registerModel.findById(decode.id).select('-password');
			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error('Not Authorize');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Not Authorize No Token');
	}
});
module.exports = authMidleware;
