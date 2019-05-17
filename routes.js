const Athlete = require('./models').Athlete;
const Cross = require('./models').Cross;
const createError = require('http-errors');

async function crossCheckpoint(req, res, next) {
    let athlete = await Athlete.findByPk(req.body.athleteId);
    if (!athlete) {
        return next(createError(400));
    }
    await Cross.create({
        athleteId: athlete.id,
        event: req.body.event,
        time: new Date(),
    });
    res.send({status: "ok"});
}

async function fetchHistory(req, res) {
    let crosses = await Cross.findAll();
    res.send({crosses});
}

async function fetchAthletes(req, res) {
    let athletes = await Athlete.findAll();
    res.send({athletes: athletes})
}

async function resetProgress(req, res) {
    await Cross.destroy({where: {}});
    res.send({status: "ok"});
}

module.exports = {
    crossCheckpoint,
    fetchHistory,
    fetchAthletes,
    resetProgress
};
