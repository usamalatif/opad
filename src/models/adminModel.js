const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const admin = new mongoose.Schema({
    user_name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wallet_address: { type: String },
    twoFactorSecret: { type: String },
    twoFactorEnabled: { type: Boolean, default: false },
    scanned_status: { type: Boolean, default: false },
    token: { type: String }
});
admin.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
module.exports = mongoose.model("admin", admin);
