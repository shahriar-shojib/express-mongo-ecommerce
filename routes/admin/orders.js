const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const Order = require('../../models/Order');
const User = require('../../models/User');

router.get('/', async (_req, res) => {
	try {
		const orders = await Order.find().exec();
		if (orders.length === 0) throw new Error('No orders found');
		const ordersWithInfo = await Promise.all(
			orders.map(async (e) => {
				let itemsWithDetails = await Promise.all(
					e.items.map(async (item) => {
						const productInfo = await Product.findOne({ _id: item.product_id }).exec();
						return { ...item.toObject(), item_info: { ...productInfo.toObject() } };
					})
				);
				const { username } = await User.findOne({ _id: e.user_id }).exec();
				return { ...e.toObject(), items: itemsWithDetails, username };
			})
		);
		res.json(ordersWithInfo);
	} catch (_e) {
		res.json({ success: false, message: 'No Orders yet' });
	}
});

router.post('/update', async (req, res) => {
	const order = await Order.findByIdAndUpdate({ _id: req.body.id }, { status: req.body.status }).exec();
	console.log(order);
	res.json(order);
});

module.exports = router;
