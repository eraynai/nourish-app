const Fridge = require('../models/fridge');
const User = require('../models/user');

async function create(req, res) {
	try {
		const newFridge = await Fridge.create({
			name: req.body.name,
			address: req.body.address,
			lat: req.body.lat,
			lng: req.body.lng,
			time: req.body.time,
			user: req.body._id,
			date: req.body.date,
			description: req.body.description,
		});
		User.findById(req.user._id, function (err, user) {
			user.fridges.push(newFridge);
			user.save();
			console.log('this is the req.user', User.fridges);
		});
		res.status(200).json('ok, event added to db');
	} catch (err) {
		res.json(err);
	}
}

async function getAll(req, res) {
	try {
		let fridges = await Fridge({});
		res.status(200).json(fridges);
	} catch (err) {
		res.json(err);
	}
}

module.exports = {
	create,
	getAll,
};
