const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const ordersRouter = require('./order');
const jwt = require('jsonwebtoken');
const auth = require('../../middlewares/userAuth');

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;
		const doc = await User.findOne({ username }).exec();
		if (!doc) throw new Error('Invalid user name');

		if (await bcrypt.compare(password, doc.password)) {
			jwt.sign({ id: doc._id }, 'randomString', { expiresIn: '7d' }, (_err, token) => {
				res.json({ success: true, token });
			});
		} else {
			res.status(400);
			res.json({ success: false, message: 'wrong username or password' });
		}
	} catch (error) {
		res.status(400).json({ success: false, message: error.message });
	}
});

router.post('/create', async (req, res) => {
	const { username, password } = req.body;
	const encryptedPassword = await bcrypt.hash(password, 10);

	const user = new User({
		username,
		password: encryptedPassword,
	});
	try {
		if (await User.exists({ username })) throw new Error('Duplicate Username');
		let doc = await user.save();
		jwt.sign({ id: doc._id }, 'randomString', { expiresIn: 3600 }, (_err, token) => {
			res.json({ success: true, token });
		});
	} catch (_e) {
		console.log(_e);
		res.status(400).json({ success: false, message: 'User with same name already exists!' });
	}
});

router.use('/order', auth, ordersRouter);
module.exports = router;
