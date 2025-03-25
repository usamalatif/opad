const adminModel = require('../models/adminModel');
const PresaleStage = require('../models/pressaleStagesModel');

//create pre-sale
exports.createPresaleStage = async (req, res) => {
    let { stage_number, coin_name, coin_price, percentage_sold } = req.body;
    try {
        const existing_stage = await PresaleStage.findOne({ stage_number });
        if (existing_stage) {
            return res.status(200).json({ status: 200, message: "Presale stage already exists" });
        }
        // Count the number of stages for the given coin name
        const presaleCount = await PresaleStage.countDocuments({ stage_number });
        if (presaleCount >= 5) {
            return res.status(400).json({ status: 400, message: 'Cannot create more than 6 presale stages' });
        }
        if (percentage_sold > 100) {
            return res.status(400).json({ status: 400, message: 'Percentage must be equal or less than 100' });

        }//create new stage
        const stage = new PresaleStage({ stage_number, coin_name, coin_price, percentage_sold });
        await stage.save();
        return res.status(200).json({ status: 200, stage });
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message })
    }
};
exports.activateStage = async (req, res) => {
    const { stage_number } = req.body;
    const id = req.user.admin_id;
    try {
        //validate admin
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(200).json({ status: 401, message: 'only admin can access this' });
        }
        else {
            //find stage and chnage its status
            const stage = await PresaleStage.findOne({ stage_number });
            if (!stage) {
                return res.status(404).json({ msg: 'Stage not found' });
            }
            if (stage.status == true) {
                stage.status = false;
                await stage.save();

                return res.status(200).json({ message: 'Stage De-ctivated successfully!', status: stage.status });
            }
            else {
                stage.status = true;
                await stage.save();

                return res.status(200).json({ message: 'Stage Activated successfully!', status: stage.status });
            }
        }
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message })
    }
};
exports.updateStage = async (req, res) => {
    let { stage_number, coin_name, coin_price, percentage_sold, total_tokens, max_amount, start_date_time, end_date_time } = req.body;

    const id = req.user.admin_id;
    try {
        //verify admin
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(200).json({ status: 401, message: 'only admin can access this' });
        }
        //update
        const stage = await PresaleStage.findOne({ stage_number });
        if (!stage) {
            return res.status(404).json({ msg: 'Stage not found' });
        }
        if (percentage_sold > 100) {
            return res.status(400).json({ status: 400, message: 'Percentage must be equal or less than 100' });
        }

        if (coin_price !== undefined) stage.coin_price = coin_price;
        if (percentage_sold !== undefined) stage.percentage_sold = percentage_sold;
        if (coin_name !== undefined) stage.coin_name = coin_name;
        if (total_tokens !== undefined) stage.total_tokens = total_tokens;
        if (max_amount !== undefined) stage.max_amount = max_amount;
        if (start_date_time !== undefined) stage.start_date_time = start_date_time;
        if (end_date_time !== undefined) stage.end_date_time = end_date_time;
        await stage.save();

        return res.status(200).json({ status: 200, message: 'Stage Updated!', data: stage });
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message })
    }
};
//get presales
exports.getPresales = async (req, res) => {
    const id = req.user.admin_id;
    try {
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(200).json({ status: 401, message: 'only admin can access this' });
        }
        const presales = await PresaleStage.find();
        return res.status(200).json({ status: 200, message: 'Pre sales Stages!', data: presales });
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message })
    }
}