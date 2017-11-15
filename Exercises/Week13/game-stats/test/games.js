let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
let expect = chai.expect;

let Game = require('../models/game');
let Team = require('../models/team');

//app.listen("3000");

chai.use(chaiHttp);

describe('Games', () => {
  beforeEach((done) => {
    Games.remove({}, (err) => {
      done();
    });
  });
  describe('/GET games', () => {
    it('it should GET all the games', (done) => {
      chai.request(app)
        .get('/games')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.ba.a('array');
          res.body.length.should.be.eql(0);
          done();
      });
    });

    it('it should return all the games', (done) => {
      var expectedGame = new Game.save({
        sport: "football",
        start: Date.now(),
        end: Date.now(),
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
        result: "Dallas Cowboys wins"
      });

      chai.request(app)
        .get('/games')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.ba.a('array');
          res.body.length.should.be.eql(1);
          let returnedGame = res.body[0];
          returnedGame.sport.should.be.eql(expectGame.sport);
          returnedGame.sport.should.be.eql(expectGame.result);
          done();
      });
    });
  });
  describe('/POST games', () => {
    it('it should create a game', (done) => {
      var expectedGame = new Game.save({
        sport: "football",
        start: Date.now(),
        end: Date.now(),
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
        result: "Dallas Cowboys wins"
      });

      chai.request(app)
        .get('/games')
        .send(expectedGame)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.
          done();
      });
    })
  });
  describe('/GET games/:id', () => {
    it('it should GET a specific game', (done) => {
      //TODO
      expect(false, 'todo').to.be.true;
    })
  });
  describe('/PUT games/:id', () => {
    it('it should update a specific game', (done) => {
      //TODO
      expect(false, 'todo').to.be.true;
    })
  });
  describe('/DELETE games/:id', () => {
    it('it should delete a specific game', (done) => {
      //TODO
      expect(false, 'todo').to.be.true;
    })
  });
});
