
const bcrypt = require('bcryptjs/dist/bcrypt');
const mongoose = require('mongoose');

const PresaleCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    // maxlength: 8,
  },
  entries: {
    type: Number,
    required: true,
    default: 0,
  },
});

// PresaleCodeSchema.pre('save', async function (next) {
//     if (this.isModified('code')) {
//       const salt = await bcrypt.genSalt(10);
//       this.code = await bcrypt.hash(this.code, salt);
//     }
//     next();
//   });
  
//   // Method to compare codes
// PresaleCodeSchema.methods.compareCode = async function (candidateCode) {
//     return await bcrypt.compare(candidateCode, this.code);
//   };

module.exports = mongoose.model('PresaleCode', PresaleCodeSchema);