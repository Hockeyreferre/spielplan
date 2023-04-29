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

router.get('/game/:id', async (req, res) => {
    let game = await Model.findById(req.params.id)
    res.json(game)
})

router.get('/goals/:id/:team', async (req, res) => {
    let game = await Goal.find({gameID: req.params.id, verein: req.params.team})
    res.json(game)
})

router.get('/goals/:id', async (req, res) => {
    let game = await Goal.find({gameID: req.params.id})
    res.json(game)
})

module.exports = router