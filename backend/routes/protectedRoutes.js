const express = require('express');
const protectedRoute = express.Router();
const routeConroller = require('../goalController/routeConroller');
const authMidleware = require('../midleware/authMidleware');

protectedRoute.get('/privacy', authMidleware, routeConroller);
module.exports = protectedRoute;
