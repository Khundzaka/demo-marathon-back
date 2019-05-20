process.env.NODE_ENV = "test";

const models = require('../models');

const chai = require('chai');
const faker = require('faker');
const chaiHttp = require('chai-http');
const app = require('../app');
const ioClient = require('socket.io-client');

const should = chai.should();
const expect = chai.expect();

chai.use(chaiHttp);


describe('api tests', () => {

    before('Setting up db', (done) => {
        models.sequelize.sync().then(() => {
            let athletes = [];
            for (let i = 0; i < 20; i++) {
                athletes.push({
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    number: i + 1,
                    createdAt: new Date(),
                    updatedAt: new Date()
                });
            }

            models.Athlete.bulkCreate(athletes, {}).then(() => {
                done();
            });
        });

    });

    // after('clean db', () => {
    // });

    const store = {};

    describe('get /api/athletes', () => {
        it('it should get all athletes', (done) => {

            chai.request(app)
                .get('/api/athletes')
                .end((err, res) => {
                    store.athletes = res.body.athletes;
                    res.should.have.status(200);
                    res.body.athletes.should.have.lengthOf(20);
                    done();
                });
        });
    });

    describe('get /api/cross', () => {
        it('it should create checkpoint on cross', (done) => {

            chai.request(app)
                .post('/api/actions/cross').send({
                athleteId: store.athletes[0].id,
                event: "corridor_entered"
            })
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.status.should.equal("ok");
                    done();
                });
        });
        it('it should not create checkpoint on cross if id is not in database', (done) => {

            chai.request(app)
                .post('/api/actions/cross').send({
                athleteId: -1,
                event: "corridor_entered"
            })
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(400);
                    done();
                });
        });
    });

    describe('get /api/history', () => {
        it('it should get all crosses', (done) => {

            chai.request(app)
                .get('/api/history')
                .end((err, res) => {
                    store.athletes = res.body.athletes;
                    res.should.have.status(200);
                    res.body.crosses.should.have.lengthOf(1);
                    done();
                });
        });
    });

    describe('post /api/reset', () => {
        it('it should clear all crosses', (done) => {

            chai.request(app)
                .post('/api/reset').send({})
                .end((err, res) => {
                    store.athletes = res.body.athletes;
                    res.should.have.status(200);
                    res.body.status.should.equal("ok");

                    models.Cross.findAll().then((crosses) => {
                        crosses.should.be.lengthOf(0);
                        done();
                    });
                });
        });
    });

    describe('socket', () => {
        let socket1, socket2;

        it('it should connect successfully', (done) => {

            chai.request(app)
                .post('/api/reset').send({})
                .end((err, res) => {
                    store.athletes = res.body.athletes;
                    res.should.have.status(200);
                    res.body.status.should.equal("ok");

                    models.Cross.findAll().then((crosses) => {
                        crosses.should.be.lengthOf(0);
                        done();
                    });
                });
        });
    });



});

