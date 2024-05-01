const mongoose = require('mongoose');

const MongoDbConnection = async() => {
	await mongoose
		.connect(process.env.MONGO_URI)
		.then(() => console.log('Database Connected'))
		.catch((err) => console.log(`Something went wrong: ${err}`));
};
module.exports = MongoDbConnection
