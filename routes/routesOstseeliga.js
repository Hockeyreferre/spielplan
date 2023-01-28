const express = require('express');
const Model = require('../models/model');
const Aufstellung = require('../models/aufstellung');
const Team = require('../models/team');
const Goal = require('../models/goal');
const Tabelle = require('../models/tabelle');
const Trainer = require('../models/trainer');
const Penalty = require('../models/penalty');
const router = express.Router();
const liga = 'ostseeliga'
const table = { place: 1 }
const sort = { live: -1, date: 1, time: 1 }

router.get('', async (req, res) => {
    res.render('startseiteLiga', { live: await Model.find({ live: true }).sort(sort), liga: liga });
})

router.get('/spielplan', async (req, res) => {
    res.render('spielplan', { liga: await Model.find({ liga: 'ligaspiel' }).sort(sort), test: await Model.find({ liga: 'testspiel' }).sort(sort) });
})

router.get('/tabelle', async (req, res) => {
    res.render('tabelle', { data: await Tabelle.find().sort(table) });
})

router.get('/game/:home/:away', async (req, res) => {
    res.render('gamedetail', { home: await Aufstellung.findOne({ teamName: req.params.home }), away: await Aufstellung.findOne({ teamName: req.params.away }) });
})

module.exports = router