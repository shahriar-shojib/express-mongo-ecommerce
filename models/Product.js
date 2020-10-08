const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
	name: { type: String, required: true },
	product_image: { type: String, required: true },
	price: { type: Number, required: true },
	discount_percent: Number,
});
const Products = mongoose.model('Products', ProductSchema);
module.exports = Products;
