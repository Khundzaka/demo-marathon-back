require('dotenv').config();

const express = require('express');
const createError = require('http-errors');
const status = require('http-status');
const bodyParser = require('body-parser');
const socket = require('./socket');
const routes = require('./routes');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/api/athletes', routes.fetchAthletes);
app.post('/api/actions/cross', routes.crossCheckpoint);
app.get('/api/history', routes.fetchHistory);
app.post('/api/reset', routes.resetProgress);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(status.NOT_FOUND));
});

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || status.INTERNAL_SERVER_ERROR)
        .send(err.message);
});

io.on('connection', socket(io));



module.exports = app;
