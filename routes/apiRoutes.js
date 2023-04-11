const express = require('express');
const Model = require('../models/model');
const Aufstellung = require('../models/aufstellung');
const Tabelle = require('../models/tabelle');
const Goal = require('../models/goal');
const Penalty = require('../models/penalty');
const router = express.Router();
const sort = { points: -1, games: -1 }

router.get('', async (req, res) => {
    let games = await Model.find().sort({live: -1})
    res.json(games);
})

router.get('/live', async (req, res) => {
    let games = await Model.find({ live: true }).sort({live: -1})
    res.json(games);
})

router.get('/tabelle/:liga', async (req, res) => {
    let table = await Tabelle.find({ liga: req.params.liga}).sort(sort);
    res.json(table)
})

router.get('/game/:id/:home/:away', async (req, res) => {
    const teamNameAway = req.params.away + " " + req.params.id;
    const teamNameHome = req.params.home + " " + req.params.id;
    res.render('gamedetail', { 
        home: await Aufstellung.findOne({ teamName: teamNameHome }), 
        away: await Aufstellung.findOne({ teamName: teamNameAway }), 
        data: await Model.findById(req.params.id), 
        liga: liga, 
        goals: await Goal.find({ gameID: req.params.id }), 
        penaltys: await Penalty.find({ gameID: req.params.id }).sort({time: 1}),
        goalsHome: await Goal.find({ gameID: req.params.id, verein: req.params.home }),
        goalsAway: await Goal.find({ gameID: req.params.id, verein: req.params.away }),
        goalsHome1: await Goal.find({ gameID: req.params.id, verein: req.params.home, period: 1 }),
        goalsHome2: await Goal.find({ gameID: req.params.id, verein: req.params.home, period: 2 }),
        goalsHome3: await Goal.find({ gameID: req.params.id, verein: req.params.home, period: 3 }),
        goalsAway1: await Goal.find({ gameID: req.params.id, verein: req.params.away, period: 1 }),
        goalsAway2: await Goal.find({ gameID: req.params.id, verein: req.params.away, period: 2 }),
        goalsAway3: await Goal.find({ gameID: req.params.id, verein: req.params.away, period: 3 }),
        goalsHomeOT: await Goal.find({ gameID: req.params.id, verein: req.params.home, period: 4 }),
        goalsAwayOT: await Goal.find({ gameID: req.params.id, verein: req.params.away, period: 4 })
    })
})

module.exports = router