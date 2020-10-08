const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
	code: {
		type: String,
		required: true,
	},
	description: String,
	expires: String,
	max_uses: Number,
	used_count: {
		type: Number,
		default: 0,
	},
	discount_amount: Number,
});

const Coupon = mongoose.model('Coupon', CouponSchema);
module.exports = Coupon;
