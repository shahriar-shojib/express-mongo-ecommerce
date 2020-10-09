const express = require('express');
const { exists } = require('../models/Coupon');
const router = express.Router();
const Coupon = require('../models/Coupon');
router.get('/:code', async (req, res) => {
	try {
		const code = req.params.code;
		const data = await Coupon.findOne({ code });
		if (data) {
			if (data.max_uses === data.used_count) throw new Error('Coupon Code already used');
			res.json({ success: true, data: data.toObject() });
		} else {
			throw new Error("Promo Code doesn't exist");
		}
	} catch (error) {
		res.json({ success: false, message: error.message });
	}
});

module.exports = router;
