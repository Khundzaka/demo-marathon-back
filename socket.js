const emitter = require('./utils/emitter');

function findClients(io) {
    const res = [];
    const ns = io.of("/");

    if (ns) {
        for (let id in ns.connected) {
            res.push(ns.connected[id]);
        }
    }
    return res;
}

module.exports = function (io) {
    emitter.on('cross', function (crossData) {
        // console.log(crossData);
        findClients(io).filter(conn => conn.userData.active)
            .forEach(conn => conn.emit('cross', crossData))
    });
    emitter.on('reset', function (resetData) {
        // console.log(crossData);
        findClients(io).filter(conn => conn.userData.active)
            .forEach(conn => conn.emit('reset', resetData))
    });

    return (connection) => {
        connection.userData = {active: true};
        connection.on('stateChange', function (data) {
            console.log(data)
        });
    }
};
