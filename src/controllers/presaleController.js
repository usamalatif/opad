// controllers/presaleController.js
const PresaleCode = require('../models/presaleCode');

exports.getAllCodes = async (req, res) => {
  try {
    const codes = await PresaleCode.find();
    res.json(codes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addCode = async (req, res) => {
  const { code } = req.body;

  if (!code || code.length > 8) {
    return res.status(400).json({ message: 'Invalid code length' });
  }

  try {
    const existingCode = await PresaleCode.findOne({ code });
    if (existingCode) {
      return res.status(400).json({ message: 'Code already exists' });
    }

    const newCode = new PresaleCode({ code });
    await newCode.save();
    res.status(201).json(newCode);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCode = async (req, res) => {
  const { id } = req.params;
  const { newCode } = req.body;

  if (!newCode || newCode.length > 8) {
    return res.status(400).json({ message: 'Invalid code length' });
  }

  try {
    const existingCode = await PresaleCode.findOne({ code: newCode });
    if (existingCode) {
      return res.status(400).json({ message: 'Code already exists' });
    }

    const updatedCode = await PresaleCode.findByIdAndUpdate(
      id,
      { code: newCode },
      { new: true }
    );

    if (!updatedCode) {
      return res.status(404).json({ message: 'Code not found' });
    }

    res.json(updatedCode);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCode = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCode = await PresaleCode.findByIdAndDelete(id);
    if (!deletedCode) {
      return res.status(404).json({ message: 'Code not found' });
    }
    res.json({ message: 'Code deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.incrementEntries = async (req, res) => {
    const { code } = req.params;
  
    try {
      // Fetch all presale codes
      const presaleCode = await PresaleCode.findOne({ code });
  
      // Find the matching code by comparing hashes
    //   let presaleCode = null;
    //   for (const pc of presaleCodes) {
    //     const isValid = await pc.compareCode(code);
    //     if (isValid) {
    //       presaleCode = pc;
    //       break;
    //     }
    //   }
  
      if (!presaleCode) {
        return res.status(404).json({ message: 'Code not found' });
      }
  
      // Increment entries
      presaleCode.entries += 1;
      await presaleCode.save();
  
      res.json(presaleCode);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


// exports.increment = async (req,res)=>{
//     const { code } = req.params;
//     try {
//       const presaleCode = await PresaleCode.findOne({ code });
//       if (!presaleCode) {
//         return res.status(404).json({ message: 'Code not found' });
//       }
  
//       presaleCode.entries += 1;
//       await presaleCode.save();
  
//       res.json(presaleCode);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
// }