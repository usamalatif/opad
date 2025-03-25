const mongoose = require('mongoose');

const vestingSchema = new mongoose.Schema({
    vesting_number: { type: Number, required: true },
    start_date: { type: Date, default: Date.now },
    percentage: { type: Number, required: true, default: 0 },
    default_values: { type: Boolean },
    status: { type: String, enum: ['completed', 'available', 'unavailable'] }
},
    {
        timestamps: true
    });

const Claim = mongoose.model('Vesting', vestingSchema);

module.exports = Claim;
