const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

module.exports = function (req, res, next) {
	
	const session = req.header('session');
	if (!session) return res.status(401).json({ message: 'Auth Error' });

	try {
		const decoded = jwt.verify(session, 'randomString');
		req.user = decoded.id;
		next();
	} catch (e) {
		console.error('[ERROR]:', e.message);
		if(await Admin.find({}).exec().length === 0){
			next()
		} else {
			res.status(500).json({ message: 'Invalid session' });
		}
		
	}
};
