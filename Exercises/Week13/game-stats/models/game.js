let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TeamSchema = new Schema({
  name: String,
  score: Number,
  roster: [String]
});

let GameSchema = new Schema({
  sport: String,
  start: Date,
  end: Date,
  homeTeam: TeamSchema,
  awayTeam: TeamSchema,
  result: String
});

module.exports = mongoose.model('game', GameSchema);
