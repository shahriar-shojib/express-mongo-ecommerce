const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const ordersRouter = require('./order');

const auth = require('../../middlewares/userAuth');

router.post('/login', async (req, res) => {
	const { username, password } = req.body;
	const doc = await User.findOne({ username }).exec();

	if (await bcrypt.compare(password, doc.password)) {
		jwt.sign({ id: doc._id }, 'randomString', { expiresIn: 3600 }, (_err, token) => {
			res.json({ success: true, token });
		});
	} else {
		res.status(400);
		res.json({ success: false, message: 'wrong username or password' });
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
		let doc = await user.save();
		jwt.sign({ id: doc._id }, 'randomString', { expiresIn: 3600 }, (_err, token) => {
			res.json({ success: true, token });
		});
	} catch (_e) {
		res.status(400).json({ success: false, message: 'User with same name already exists!' });
	}
});

router.use('/orders', auth, ordersRouter);
module.exports = router;
