const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const Order = require('../../models/Order');
const Coupons = require('../../models/Coupon');

router.post('/create', async (req, res) => {
	try {
		const { items, promo_code } = req.body;
		console.log(promo_code);
		const user_id = req.user;
		let total = 0;
		await Promise.all(
			items.map(async (item) => {
				const product = await Product.findOne({ _id: item.product_id }).exec();
				let discount = product.price * (product.discount_percent / 100);
				let totalPrice = product.price - discount;
				let totalWithShipping = totalPrice * item.quantity + product.shipping_charge;
				total += totalWithShipping;
				return null;
			})
		);
		let amount = total;
		let promo_code_id;

		if (promo_code) {
			const { discount_percent, _id, used_count, max_uses } = await Coupons.findOne({ code: promo_code }).exec();
			if (used_count === max_uses) throw new Error('Coupon Code Already used');
			promo_code_id = _id;
			let discount = total * (discount_percent / 100);
			amount = total - discount; //apply promo code discount;
			await Coupons.findByIdAndUpdate({ _id: promo_code_id }, { used_count: used_count + 1 });
		}

		const order = new Order({
			items,
			amount,
			promo_code,
			promo_code_id,
			user_id,
		});

		res.json(await order.save());
	} catch (error) {
		console.log(error);
		res.status(400).json({ success: false, message: error.message });
	}
});

router.get('/', async (_req, res) => {
	const user_id = req.user;
	const orders = await Orders.find({ user_id }).exec();
	res.json(orders);
});
module.exports = router;
