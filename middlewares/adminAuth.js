const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

module.exports = async function (req, res, next) {
	const session = req.header('session');
	if (!session) {
		let doc = await Admin.find({}).exec();
		if (doc.length === 0) {
			return next();
		} else {
			return res.status(401).json({ message: 'Auth Error' });
		}
	}

	try {
		const decoded = jwt.verify(session, 'randomString');
		req.user = decoded.id;
		next();
	} catch (e) {
		console.error('[ERROR]:', e.message);
		res.status(500).json({ message: 'Invalid session' });
	}
};
