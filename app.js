require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const socket = require('./socket');
const routes = require('./routes');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = require('http').createServer();
const io = require('socket.io')(server);

app.get('api/runners', routes.fetchRunners);
app.post('api/actions/cross', routes.crossCheckpoint);
app.get('api/history', routes.fetchHistory);
app.post('api/reset', routes.resetProgress);

io.on('connection', socket(io));

module.exports = app;
