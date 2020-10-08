require('dotenv').config();
const mongoose = require('mongoose');
const { MONGO_URL } = process.env;
async function connect() {
	await mongoose.connect(MONGO_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
	console.log('connected to db');
}
module.exports = connect;
