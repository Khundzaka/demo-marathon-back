process.env.NODE_ENV = "test";

const User = require('../db/models').User;
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const should = chai.should();

chai.use(chaiHttp)
