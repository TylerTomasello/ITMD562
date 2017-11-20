let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TeamSchema = new Schema({
	name: String,
	score: Number,
	roster: [String]
});

module.exports = mongoose.model('team', TeamSchema);
