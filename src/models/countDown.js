const mongoose = require('mongoose');

const countdown = new mongoose.Schema({
    date: { type: Date }
});

module.exports = mongoose.model('countdown', countdown);
