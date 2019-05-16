const emmiter = require('./utils/emitter');

module.exports = function (io) {
    emmiter.on('cross', function (runnerData) {
        io.sockets.connected.filter(conn => conn.userData.active)
            .forEach(conn => conn.emit(runnerData))
    });

    return (connection) => {
        connection.userData = {active: true};
        connection.on('stateChange', function (data) {
            console.log(data)
        });
    }
};
