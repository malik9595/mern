const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			require: [true, 'email is compulsory'],
		},
		password: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('registerModel', userSchema);
