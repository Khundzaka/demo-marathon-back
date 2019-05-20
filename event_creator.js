const rp = require('request-promise');

const api = 'http://localhost:3333/api/';

function request(path, method, body) {
    body = body || {};
    let params = {method: method, uri: api + path, json: true};
    if (method === 'POST') {
        params.body = body;
    }
    return rp(params);
}

function getAllAthletes() {
    console.log("fetching athletes");
    return request('athletes', 'GET')
        .then(resp => resp.athletes);
}

function crossCheckpoint(athleteId, event) {
    console.log(`crossing checkpoint ${athleteId} - ${event}`);
    return request('actions/cross', 'POST', {athleteId, event})
        .then(resp => resp.status);
}

function resetProgress() {
    console.log("resetting progress");
    return request('reset', 'POST').then(resp => resp.status)
}

function timeout(millis) {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, millis);
    });
}

async function fullCycle(athletes) {
    for (const athlete of athletes) {
        await crossCheckpoint(athlete.id, 'corridor_entered');
        await timeout(1200);
    }
    for (const athlete of athletes) {
        await crossCheckpoint(athlete.id, 'finish_entered');
        await timeout(1200);
    }
}

function loop() {
    resetProgress()
        .then(() => {
            return getAllAthletes();
        })
        .then((athletes) => {
            return fullCycle(athletes);
        })
        .then(() => {
            loop();
        });
}

loop();

