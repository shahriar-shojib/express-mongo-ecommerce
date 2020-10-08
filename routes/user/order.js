const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const Order = require('../../models/Order');
const Coupons = require('../../models/Coupon');

router.post('/create', async (req, res) => {
	const { items, promo_code } = req.body;
	const user_id = req.user;
	const [total] = await Promise.all(
		items.reduce(async (item, acc) => {
			const product = await Product.find({ _id: item.product_id }).exec();
			acc = acc + product.price;
			return acc;
		}, 0)
	);

	let amount = total;
	let promo_code_id;

	if (promo_code) {
		const { discount_amount, _id } = await Coupons.find({ code: promo_code }).exec();
		promo_code_id = _id;
		amount = amount * (discount_amount / 100);
	}

	const order = new Order({
		items,
		amount,
		promo_code,
		user_id,
	});

	res.json(await order.save());
});

router.get('/', async (_req, res) => {
	const user_id = req.user;
	const orders = await Orders.find({ user_id }).exec();
	res.json(orders);
});
module.exports = router;
