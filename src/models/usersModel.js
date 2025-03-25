const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    wallet_address: { type: String, required: true },
    token: { type: String },
    signature: { type: String, required: true }
})

module.exports = mongoose.model("user", UserSchema);
