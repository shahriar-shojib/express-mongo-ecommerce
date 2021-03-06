const e = require('express');
const express = require('express');
const router = express.Router();
const Coupon = require('../../models/Coupon');
router.get('/', async (req, res) => {
	const coupons = await Coupon.find({}).exec();
	res.json(coupons);
});

router.post('/create', async (req, res) => {
	const { code, max_uses, expires, description, discount_percent } = req.body;
	const coupon = new Coupon({ code, max_uses, expires, description, discount_percent });
	res.json((await coupon.save()).toObject());
});
router.post('/update/:id', (req, res) => {
	res.text('todo');
});
router.get('/delete/:id', async (req, res) => {
	try {
		await Coupon.findByIdAndDelete({ _id: req.params.id });
		res.json({
			success: true,
		});
	} catch (error) {
		res.json({
			success: false,
			message: error.message,
		});
	}
});

module.exports = router;
