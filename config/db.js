require('dotenv').config();
const mongoose = require('mongoose');

async function connect() {
	const { MONGO_URL } = process.env;
	await mongoose.connect(MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	});
	console.log('connected to db');
}
module.exports = connect;
