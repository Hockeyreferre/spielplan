const mongoose = require('mongoose');

const table = new mongoose.Schema({
    place: {
        required: true,
        type: Number
    },
    logo: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    games: {
        required: true,
        type: Number
    },
    win: {
        required: true,
        type: Number
    },
    loose: {
        required: true,
        type: Number
    },
    winOT: {
        required: true,
        type: Number
    },
    looseOT: {
        required: true,
        type: Number
    },
    goals: {
        required: true,
        type: Number
    },
    ggoals: {
        required: true,
        type: Number
    },
    points: {
        required: false,
        type: Number
    }, 
    liga: {
        type: String
    }
})

module.exports = mongoose.model('Table', table)