let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let expect = chai.expect;

let Game = require('../models/game');
let Team = require('../models/team');

chai.use(chaiHttp);

describe('Games', () => {
	beforeEach((done) => {
		Game.remove({}, (err) => {
			done();
		});
	});
	describe('/GET games', () => {
		it('it should return empty array when no games are present', (done) => {
			chai.request(app)
				.get('/games')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
					done();
				});
		});
		it('it should return all games', (done) => {
			var expectedGame = new Game({
				sport:    "football",
				start:    Date.now(),
				end:      Date.now(),
				homeTeam: {
							name: "Chicago Bears",
							score: 0,
							roster: []
						  },
				awayTeam: {
							name: "Dallas Cowboys",
							score: 10,
							roster: []
						  },
				result:   "Dallas Cowboys wins"
			});
			expectedGame.save();
			chai.request(app)
				.get('/games')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(1);
					let returnedGame = res.body[0];
					returnedGame.sport.should.be.eql(expectedGame.sport);
					returnedGame.result.should.be.eql(expectedGame.result);
					done();
				});
		});
	});
	describe('/POST games', () => {
		it('it should create a game', (done) => {
			var expectedGame = {
				sport:    "football",
				start:    Date.now(),
				end:      Date.now(),
				homeTeam: {
							name: "Chicago Bears",
							score: 0,
							roster: []
						  },
				awayTeam: {
							name: "Dallas Cowboys",
							score: 10,
							roster: []
						  },
				result:   "Dallas Cowboys wins"
			};
			chai.request(app)
				.post('/games')
				.send(expectedGame)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.message.should.eql("Game successfully added!");
					Game.find({sport: expectedGame.sport}).exec((err, games) => {
						games.length.should.be.eql(1);
						done();
				    });
				});
		})
	});
	describe('/GET games/:id', () => {
		it('it should get a specific game', (done) => {
			var expectedGame = new Game({
				sport:    "football",
				start:    Date.now(),
				end:      Date.now(),
				homeTeam: {
							name: "Chicago Bears",
							score: 0,
							roster: []
						  },
				awayTeam: {
							name: "Dallas Cowboys",
							score: 10,
							roster: []
						  },
				result:   "Dallas Cowboys wins"
			});
			expectedGame.save();
			chai.request(app)
				.get('/games/' + expectedGame.id)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.sport.should.be.eql(expectedGame.sport);
					res.bosy.result.should.be.eql(expectedGame.result);
					done();
				});
			});
		});
	});
	describe('/PUT games/:id', () => {
		it('it should update a specific game', (done) => {
			var expectedGame = new Game({
				sport:    "football",
				start:    Date.now(),
				end:      Date.now(),
				homeTeam: {
							name: "Chicago Bears",
							score: 0,
							roster: []
						  },
				awayTeam: {
							name: "Dallas Cowboys",
							score: 10,
							roster: []
						  },
				result:   "Dallas Cowboys wins"
			});
			expectedGame.save();
			var updatedGame = expectedGame;
			updatedGame.sport = "soccer;"
			chai.request(app)
				.put('/games')
				.send(updatedGame)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.message.should.eql("Game successfully updated!");
					Game.find({sport: updatedGame.sport}).exec((err, games) => {
						games.length.should.be.eql(1);
						done();
				    });
				});
		})
	});
	describe('/DELETE games/:id', () => {
		it('it should delete a specific game', (done) => {
			var expectedGame = new Game({
				sport:    "football",
				start:    Date.now(),
				end:      Date.now(),
				homeTeam: {
							name: "Chicago Bears",
							score: 0,
							roster: []
						  },
				awayTeam: {
							name: "Dallas Cowboys",
							score: 10,
							roster: []
						  },
				result:   "Dallas Cowboys wins"
			});
			expectedGame.save();
			chai.request(app)
				.put('/games' + expectedGame.id)
				.send(updatedGame)
				.end((err, res) => {
					res.should.have.status(204);
					res.body.message.should.eql("Game successfully updated!");
					Game.find({sport: updatedGame.sport}).exec((err, games) => {
						games.length.should.be.eql(1);
						done();
				    });
				});
			})
		})
	});
});
