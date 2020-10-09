const express = require('express');
const { model } = require('../../models/Product');
const router = express.Router();
const Product = require('../../models/Product');

router.get('/', async (req, res) => {
	try {
		const doc = await Product.find({}).exec();
		if (doc.length === 0) throw new Error('No Products Found');
		res.json(doc);
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

router.post('/create', async (req, res) => {
	try {
		const { name, price, discount_percent, product_image, shipping_charge } = req.body;
		const doc = new Product({
			name,
			price,
			discount_percent,
			product_image,
			shipping_charge,
		});
		await doc.save();
		res.json({ success: true, message: 'product added successfully' });
	} catch (error) {
		res.status(400);
		res.json({ success: false, message: error.message });
	}
});

module.exports = router;
