const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const Order = require('../../models/Order');
const User = require('../../models/User');

router.get('/', async (req, res) => {
	try {
		const orders = await Order.find({}).exec();
		if (orders.length === 0) throw new Error('No orders found');
		const ordersWithInfo = await Promise.all(
			orders.map(async (e) => {
				const productInfo = await Product.find({ _id: e.product_id }).exec();
				const { username } = await User.find({ _id: e.user_id }).exec();
				return { ...e, productInfo, username };
			})
		);
		res.json(ordersWithInfo);
	} catch (_e) {
		res.json({ success: false, message: 'No Orders yet' });
	}
});

router.post('/update/:id', async (req, res) => {
	const order = await Order.findByIdAndUpdate({ _id: req.params.id }, { status: req.body.status }).exec();
	res.json(order);
});

module.exports = router;
