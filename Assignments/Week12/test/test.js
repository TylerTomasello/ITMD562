process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Reminders', () => {

  describe('/POST user', () => {
    it('it should POST a new user', (done) => {
      let newuser =
      {'user' : {
        "name" : "John",
        "email" : "jstudent@example.com"
      }}
      chai.request(server)
      .post('/users')
      .send(newuser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        //res.body.should.have.property('errors');
        // res.body.errors.should.have.property('pages');
        res.body.should.have.property('id');
        done();
      });
    });
  });

  describe('/GET/:userid ', () => {
    it('it should GET a user by the given id', (done) => {
      let userId = 1;
      chai.request(server)
      .get('/users/' + userId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        //res.body.should.have.property('id').eql(userId);
        done();
      });
    });
    it('it should not GET a user if there is no user at that id', (done) => {
      let userId = 2;
      chai.request(server)
      .get('/users/' + userId)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        // res.body.should.have.property('name');
        // res.body.should.have.property('email');
        res.body.should.have.property('message').eql("User not found for id: " + userId);
        done();
      });
    });
  });

  describe('/POST reminder', () => {
    let newremind  =   {"reminder" : {
      "title" : "Go to Store",
      "description" : "Get all the meats"
    }}
    it('it should POST a new reminder to user id', (done) => {
      let userId = 1;
      chai.request(server)
      .post('/users/' + userId + '/reminders')
      .send(newremind)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        done();
      });
    });
    it('it should not POST a new reminder if no user at id', (done) => {
      let userId = 2;
      chai.request(server)
      .post('/users/' + userId + '/reminders')
      .send(newremind)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("User not found for id: " + userId);
        done();
      });
    });
  });

  describe('/GET/ reminders', () => {
    it('it should GET all reminders by the given user id', (done) => {
      let userId = 1;
      chai.request(server)
      .get('/users/' + userId + '/reminders')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
    });
    it('it should not GET reminders if there is no user at that id', (done) => {
      let userId = 2;
      chai.request(server)
      .get('/users/' + userId + '/reminders')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("User not found for id: " + userId);
        done();
      });
    });
  });

  describe('/GET/:userId/reminders/:reminderId users', () => {
    it('it should GET a reminder by the given reminder id and user id', (done) => {
      let userId = 1;
      let reminderId = 1;
      chai.request(server)
      .get('/users/' + userId + '/reminders/' + reminderId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('description');
        done();
      });
    });
    it('it should not GET reminder if there is no reminder at that id', (done) => {
      let userId = 1;
      let reminderId = 2;
      chai.request(server)
      .get('/users/' + userId + '/reminders/' + reminderId)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Reminder not found for id: " + reminderId);
        done();
      });
    });
  });

  describe('/DELETE/:userId/reminders/:reminderId', () => {
    it('it should DELETE a reminder given a user and reminder id', (done) => {
      let userId = 1;
      let reminderId = 1;
      chai.request(server)
      .delete('/users/' + userId + '/reminders/' + reminderId)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a('object');
        res.body.should.eql({});
        done();
      });
    });
    it('it should not DELETE reminder if no reminder has that id', (done) => {
      let userId = 1;
      let reminderId = 3;
      chai.request(server)
      .delete('/users/' + userId + '/reminders/' + reminderId)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("Reminder not found for id: " + reminderId);
        done();
      });
    });
  });

  describe('/DELETE/:userId/reminders', () => {
    it('it should DELETE all reminders given a user id', (done) => {
      let userId = 1;
      chai.request(server)
      .delete('/users/' + userId + '/reminders')
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a('object');
        res.body.should.eql({});
        done();
      });
    });
    it('it should not DELETE reminders if no user has that id', (done) => {
      let userId = 2;
      chai.request(server)
      .delete('/users/' + userId + '/reminders')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("User not found for id: " + userId);
        done();
      });
    });
  });

  describe('/DELETE/:userId', () => {
    it('it should DELETE a user given the id', (done) => {
      let userId = 1;
      chai.request(server)
      .delete('/users/' + userId)
      .end((err, res) => {
        res.should.have.status(204);
        res.body.should.be.a('object');
        res.body.should.eql({});
        done();
      });
    });
    it('it should not DELETE a user if no user has that id', (done) => {
      let userId = 1;
      chai.request(server)
      .delete('/users/' + userId)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("User not found for id: " + userId);
        done();
      });
    });
  });

});
