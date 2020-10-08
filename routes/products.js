const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
	try {
		const doc = await Product.find({}).exec();
		if (doc.length === 0) throw new Error('No Products Found');
		res.json(doc);
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

module.exports = router;
