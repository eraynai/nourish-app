const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fridgeSchema = new Schema(
	{
		name: String,
		lat: Number,
		lng: Number,
		address: String,
		time: Date,
		date: Date,
		description: String,
		user: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Fridge', fridgeSchema);
