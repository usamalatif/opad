const mongoose = require('mongoose');

const Data = new mongoose.Schema({
    minimum_purchase: { type: String },
    maximum_purchase: { type: String },
    presale_allocation: { type: String },
    listing_price: { type: String },
    tge_date: { type: String },
    start_text: { type: String },
});

module.exports = mongoose.model('Data', Data);
