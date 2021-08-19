const Fridge = require('../models/fridge');
const User = require('../models/user');

async function create(req, res) {
	try {
		// const user = await User.findOne({ email: req.body.email });

		// console.log('what is this', req.body.user);
		const newFridge = await Fridge.create({
			name: req.body.name,
			address: req.body.address,
			lat: req.body.lat,
			lng: req.body.lng,
			time: req.body.time,
			user: req.user._id,
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
		let fridges = await Fridge.find({});
		console.log(fridges);
		res.status(200).json(fridges);
	} catch (err) {
		res.json(err);
	}
}

async function fridgesForUsers(req, res) {
	try {
		const fridge = await Fridge.find({ user: req.user._id })
			.populate('user')
			.exec();
		res.status(200).json(fridge);
	} catch (err) {
		console.log(err);
	}
}

async function deleteOne(req, res) {
	try {
		let fridge = await Fridge.findByIdAndDelete({ _id: req.params.id });
		console.log('the is req params', req.params.id);
		console.log('this is the fridge', fridge);
		let newfridgelist = await Fridge.find({ user: req.user._id });
		res.status(200).user(newfridgelist);
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	create,
	getAll,
	fridgesForUsers,
	deleteOne,
};
