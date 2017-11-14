/* Tyler Tomasello
*  test.js
*  Week 12 assignment8
*  11/14/17
*
*/
process.env.NODE_ENV = 'test';

//requirements to run the test file
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Call to test the server.js REST commands
describe('Users', () => {

  //test first field to POST a new user
  describe('/POST user', () => {
    it('It should POST a new user', (done) => {
      let newUser =
      {'user' : {
        "name" : "Jane Doe",
        "email" : "jdoe@example.com"
      }}
      chai.request(server)
      .post('/users')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id');
        done();
      });
    });
  });

  //test the GET to show a specific user
  describe('/GET/:userid ', () => {
    it('It should GET a specific user by the given id', (done) => {
      let userId = 1;
      chai.request(server)
      .get('/users/' + userId)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.should.have.property('email');
        done();
      });
    });
    it('It should not GET a user if there is no user at that id', (done) => {
      let userId = 2;
      chai.request(server)
      .get('/users/' + userId)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("User not found for id: " + userId);
        done();
      });
    });
  });

  //test to POST a new reminder
  describe('/POST reminder', () => {
    let newReminder  =   {"reminder" : {
      "title" : "Final Project",
      "description" : "Due the last week of finals."
    }}
    it('It should POST a new reminder to a user id', (done) => {
      let userId = 1;
      chai.request(server)
      .post('/users/' + userId + '/reminders')
      .send(newReminder)
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
      .send(newReminder)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql("User not found for id: " + userId);
        done();
      });
    });
  });

  //test to GET all reminders of a specific user
  describe('/GET/ reminders', () => {
    it('It should GET all reminders of the given user id', (done) => {
      let userId = 1;
      chai.request(server)
      .get('/users/' + userId + '/reminders')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        done();
      });
    });
    it('It should not GET reminders if no user at that id', (done) => {
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

  //test to GET a reminder by both user and reminder id
  describe('/GET/:userId/reminders/:reminderId users', () => {
    it('It should GET a reminder of the given user id and reminder id', (done) => {
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
    it('It should not GET reminder if no reminder at that id', (done) => {
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

  //test to DELETE a reminder by both user and reminder id
  describe('/DELETE/:userId/reminders/:reminderId', () => {
    it('It should DELETE a reminder of a given user id and reminder id', (done) => {
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
    it('It should not DELETE reminder if no reminder has that id', (done) => {
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

  //test to DELETE all reminders of a specific user
  describe('/DELETE/:userId/reminders', () => {
    it('It should DELETE all reminders of a given user id', (done) => {
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
    it('It should not DELETE reminders if no user has that id', (done) => {
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

  //test to DELETE a user id with all reminders
  describe('/DELETE/:userId', () => {
    it('It should DELETE a user of given user id', (done) => {
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
    it('It should not DELETE a user if no user has that id', (done) => {
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
