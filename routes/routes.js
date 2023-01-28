const express = require('express');
const Model = require('../models/model');
const router = express.Router();
const sort = { live: -1, date: 1, time: 1 }

router.get('', async (req, res) => {
    res.render('startseite', { liveU15: await Model.find({ live: true, liga: 'u15' }).sort(sort), liveOstseeliga: await Model.find({ live: true, liga: 'ostseeliga' }).sort(sort) });
})

module.exports = router