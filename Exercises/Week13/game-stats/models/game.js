let mongoose = require('mongoose');
let Team = require('./team');
let Schema = mongoose.Schema;

let GameSchema = new Schema({
	sport:    String,
	start:    Date,
	end:      Date,
	homeTeam: Team.schema,
	awayTeam: Team.schema,
	result:   String
});

module.exports = mongoose.model('game', GameSchema);
