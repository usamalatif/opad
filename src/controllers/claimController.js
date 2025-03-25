const moment = require('moment/moment');
const adminModel = require('../models/adminModel');
const vesting = require('../models/claimPresaleModel');  // Import the Claim model
const pressaleStagesModel = require('../models/pressaleStagesModel');
const usersModel = require('../models/usersModel');

exports.addVesting = async (req, res) => {
    let { vesting_number, start_date, percentage } = req.body;

    try {
        // Validate user
        // Check if vesting_number is a valid integer
        if (!Number.isInteger(Number(vesting_number))) {
            return res.status(400).json({
                status: 400,
                message: 'Please enter a valid integer for the vesting number.'
            });
        }

        vesting_number = parseInt(vesting_number, 10);
        const existing_vesting = await vesting.findOne({ vesting_number });
        if (existing_vesting) {
            return res.status(400).json({ status: 400, message: 'The vesting already exists ' });

        }
        // Create and save the claim
        const startDate = new Date(start_date);
        const currentDate = new Date();

        console.log("start_date", startDate, "current_date", currentDate);

        // Check if the start_date is in the past
        if (startDate <= currentDate) {
            return res.status(400).json({ status: 400, message: 'The provided start date must be in the future. Please select a valid future date.' });
        }
        const vestingCount = await vesting.countDocuments();
        console.log("Vesting count", vestingCount)
        if (vestingCount >= 5) {
            return res.status(400).json({ status: 400, message: 'Cannot create more than 6 vestings' });
        }
        // Create and save the claim
        const claim = new vesting({
            vesting_number,
            start_date: startDate,
            percentage: percentage,
            default_values: true
        });

        await claim.save();

        return res.status(200).json({ status: 200, message: 'Vesting addes successfully!' });
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message });
    }
};

exports.updateVesting = async (req, res) => {
    const { vesting_number, start_date, percentage } = req.body;
    const id = req.user.admin_id; // Assuming you have user authentication

    try {
        // Validate user
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(401).json({ status: 401, message: 'Unauthorized user. Only admin can access this.' });
        }

        const updateFields = {};

        // Validate and prepare start_date if provided
        if (start_date) {
            const startDate = new Date(start_date);
            const currentDate = new Date();

            if (startDate <= currentDate) {
                return res.status(400).json({ status: 400, message: 'The provided start date must be in the future. Please select a valid future date.' });
            }

            updateFields.start_date = startDate;
        }

        // Prepare percentage if provided
        if (percentage) {
            updateFields.percentage = percentage;
        }

        // If no fields are provided, return an error
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ status: 400, message: 'No fields to update. Please provide valid data.' });
        }

        // Find and update the claim by vesting_number
        const claim = await vesting.findOneAndUpdate(
            { vesting_number },
            { $set: updateFields },
            { new: true }
        );
        claim.default_values = false;

        if (!claim) {
            return res.status(404).json({ status: 404, message: 'Vesting not found' });
        }
        await claim.save();

        return res.status(200).json({ status: 200, message: 'Vesting updated successfully!', claim });
    } catch (error) {
        return res.status(500).json({ status: 500, error: error.message });
    }
};

exports.viewVesting = async (req, res) => {
    try {
        const claimed_stages = await vesting.find();
        const currentDate = new Date();

        // Include both the admin-set status and the date-based logic status
        const claimedStagesWithStatus = claimed_stages.map(stage => {
            const isVestingComplete = currentDate >= new Date(stage.start_date);

            return {
                ...stage._doc,
                status: stage.status,  // Admin-set status
                isVestingComplete,     // Date-based status
                updated_at: convertToPKT(stage.updatedAt)
            };
        });

        return res.status(200).json({ status: 200, message: 'Claimed presales!', data: claimedStagesWithStatus });
    } catch (error) {
        return res.status(500).json({ status: 500, error: error.message });
    }
};

//convert date to required format
const convertToPKT = (date) => {
    if (!date) return null; // Return null if date is undefined
    const pkTimeOffset = 5 * 60 * 60 * 1000; // PKT is UTC+5
    return new Date(date.getTime() + pkTimeOffset);
};

//toggle vesting status
exports.toggleVesting = async (req, res) => {
    const { vesting_number, status } = req.body; // 'new_status' to be passed in the request body
    const id = req.user.admin_id;
    try {
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(401).json({ message: 'Only admin can access this' });
        }

        const Vesting = await vesting.findOne({ vesting_number });
        if (!Vesting) {
            return res.status(404).json({ message: 'Vesting not found' });
        }

        // Validate the new status
        const validStatuses = ['available', 'unavailable', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid status. Valid statuses are: ${validStatuses.join(', ')}` });
        }

        // Update the status
        Vesting.status = status;
        await Vesting.save();

        return res.status(200).json({ message: `Vesting updated to ${status} successfully`, status: Vesting.status });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
