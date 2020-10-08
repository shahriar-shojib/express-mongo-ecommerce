const express = require('express');
const router = express.Router();
const Coupon = require('../../models/Coupon');
router.get('/', async (req, res) => {
	const coupons = await Coupon.find({}).exec();
	res.json(coupons);
});

router.post('/create', async (req, res) => {
	const { code, max_uses, expires, description, discount_amount } = req.body;
	const coupon = new Coupon({ code, max_uses, expires, description, discount_amount });
	res.json(await coupon.save());
});
router.post('/update/:id', (req, res) => {
	res.text('todo');
});

module.exports = router;
