const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
	items: [
		{
			product_id: String,
			quantity: Number,
		},
	],
	user_id: String,
	status: {
		type: String,
		default: 'processing',
	},
	promo_code: String,
	promo_code_id: String,
	amount: Number,
	created_at: {
		type: Date,
		default: Date.now,
	},
});
const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
