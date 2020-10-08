const express = require('express');
const router = express.Router();
const ordersRouter = require('./orders');
const Admin = require('../../models/Admin');
const bcrypt = require('bcryptjs');
const adminAuth = require('../../middlewares/adminAuth');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const doc = await Admin.findOne({ username }).exec();

	if (await bcrypt.compare(password, doc.password)) {
		jwt.sign({ id: doc._id }, 'randomString', { expiresIn: 3600 }, (_err, session) => {
			res.json({ session });
		});
	} else {
		res.status(400);
		res.json({ success: false });
	}
});

router.post('/create', adminAuth, async (req, res) => {
	// console.log(req.body);
	const { username, password } = req.body;
	const encryptedPassword = await bcrypt.hash(password, 10);
	const admin = new Admin({
		username,
		password: encryptedPassword,
	});
	try {
		await admin.save();
		res.json({ success: true });
	} catch (_e) {
		res.status(500).json({ success: false, message: 'User with same name already exists' });
	}
});

router.use('/orders', adminAuth, ordersRouter);

module.exports = router;
