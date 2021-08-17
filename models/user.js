const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	fridges: { type: Schema.Types.ObjectId, ref: 'Fridge' },
});

module.exports = mongoose.model('User', userSchema);
