
const mongoose = require("mongoose");

const ToggleStateSchema = new mongoose.Schema({
  popupEnabled: {
    type: Boolean,
    required: true,
    default: false, 
  },
});

module.exports = mongoose.model("ToggleState", ToggleStateSchema);