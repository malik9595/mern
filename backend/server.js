require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const mongoose = require('mongoose');
const goalRouter = require('./routes/goalRoutes');
const userRouter = require('./routes/userRoutes');
const privacyRouter = require('./routes/protectedRoutes');

const mongoDbConnection = require('./config/db');
const PORT = process.env.PORT || 5000;
const app = express();

mongoDbConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', goalRouter);
app.use(userRouter);

// Serve Frontend
if ((process.env.NODE_ENV = 'production')) {
	app.use(express.static(path.join(__dirname, '../frontend/build')));
	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
		);
	});
}
app.use(privacyRouter);
app.listen(PORT, () => console.log(`server started at ${PORT} `));
