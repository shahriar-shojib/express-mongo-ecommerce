require('dotenv').config();
const mongoose = require('mongoose');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const mongoURL = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
async function connect() {
	await mongoose.connect(mongoURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	});
	console.log('connected to db');
}
module.exports = connect;
