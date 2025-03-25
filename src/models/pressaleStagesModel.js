const mongoose = require('mongoose');

const PresaleStageSchema = new mongoose.Schema({
    stage_number: { type: Number, required: true },
    coin_name: { type: String, required: true },
    coin_price: { type: Number, default: null },
    total_tokens: { type: Number, default: null },
    max_amount: { type: Number, default: null },
    start_date_time: { type: Date, default: null },
    end_date_time: { type: Date, default: null },
    status: { type: Boolean, default: false },
    percentage_sold: { type: Number, default: null }
});

module.exports = mongoose.model('PresaleStage', PresaleStageSchema);