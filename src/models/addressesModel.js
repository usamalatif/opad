const mongoose = require('mongoose');

const addressesSchema = new mongoose.Schema({
    audit_link: { type: String, required: true },
    contract_address: { type: String, required: true },
    vesting_address: { type: String, required: true }
},
    {
        timestamps: true
    });

const addresses = mongoose.model('addresses', addressesSchema);

module.exports = addresses;
