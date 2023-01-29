const express = require('express');
const Model = require('../models/model');
const Aufstellung = require('../models/aufstellung');
const Tabelle = require('../models/tabelle');
const Goal = require('../models/goal');
const Penalty = require('../models/penalty');
const router = express.Router();
const liga = 'u15'
const table = { place: 1 }
const sort = { live: -1, date: 1, time: 1, abgesagt: -1 }
const aufstellung = []

router.get('', async (req, res) => {
    res.render('startseiteLiga', { live: await Model.find({ live: true, liga: liga }).sort(sort), liga: liga });
})

router.get('/spielplan', async (req, res) => {
    res.render('spielplan', { games: await Model.find({ liga: liga }).sort(sort), liga: liga });
})

router.get('/tabelle', async (req, res) => {
    res.render('404', { data: await Tabelle.find({ liga: liga }).sort(table), liga: liga });
})

router.get('/game/:id/:home/:away', async (req, res) => {
    const teamNameAway = req.params.away + " " + req.params.id;
    const teamNameHome = req.params.home + " " + req.params.id;
    res.render('gamedetail', { 
        home: await Aufstellung.findOne({ teamName: teamNameHome }) || res.render('404', { liga: liga }), 
        away: await Aufstellung.findOne({ teamName: teamNameAway }), 
        data: await Model.findById(req.params.id), 
        liga: liga, 
        goals: await Goal.find({ gameID: req.params.id }), 
        penaltys: await Penalty.find({ gameID: req.params.id }),
        goalsHome: await Goal.find({ gameID: req.params.id, verein: req.params.home }),
        goalsAway: await Goal.find({ gameID: req.params.id, verein: req.params.away }),
        goalsHome1: await Goal.find({ gameID: req.params.id, verein: req.params.home, period: 1 }),
        goalsHome2: await Goal.find({ gameID: req.params.id, verein: req.params.home, period: 2 }),
        goalsHome3: await Goal.find({ gameID: req.params.id, verein: req.params.home, period: 3 }),
        goalsAway1: await Goal.find({ gameID: req.params.id, verein: req.params.away, period: 1 }),
        goalsAway2: await Goal.find({ gameID: req.params.id, verein: req.params.away, period: 2 }),
        goalsAway3: await Goal.find({ gameID: req.params.id, verein: req.params.away, period: 3 })
    })
})

module.exports = router