const events = require('events');
let emitter;

if (!emitter) {
    emitter = new events.EventEmitter();
}

module.exports = emitter;
