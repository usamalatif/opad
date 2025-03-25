const ToggleState = require("../models/toggleModel");

// Get the current toggle state
exports.getToggleState = async (req, res) => {
  try {
    const toggleState = await ToggleState.findOne();
    if (!toggleState) {
        // If no state exists, create a default one
        const defaultState = new ToggleState({ popupEnabled: false });
      await defaultState.save();
      return res.json({ popupEnabled: false });
    }
    res.json(toggleState);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update the toggle state
exports.updateToggleState = async (req, res) => {
  const { popupEnabled } = req.body;

  if (typeof popupEnabled !== "boolean") {
    return res.status(400).json({ message: "Invalid toggle state" });
  }

  try {
    const toggleState = await ToggleState.findOneAndUpdate(
      {},
      { popupEnabled },
      { new: true, upsert: true } // Create if it doesn't exist
    );
    res.json(toggleState);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};