const adminModel = require("../models/adminModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const data = require("../models/data");
const addresses = require("../models/addressesModel");
const moment = require('moment')
const otplib = require('otplib')
const { authenticator } = require('otplib');  // Importing otplib's authenticator module
const qrcode = require('qrcode');             // For generating QR codes
// Signup
exports.adminSignup = async (req, res) => {
    try {
        //first time add the admin
        const { user_name, password } = req.body;
        let admin = await adminModel.findOne({ user_name });
        if (admin) {
            return res.status(400).json({ msg: 'Admin already exists' });
        }
        //save admin data in schema
        admin = new adminModel({
            user_name,
            password
        });
        await admin.save();
        //create jwt for authentications
        const token = jwt.sign(
            { user_name, admin_id: admin._id },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );
        admin.token = token;
        await admin.save();
        return res.status(200).json({
            status: 200,
            message: 'Admin Registered Successfully',
            token,

        });
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message });
    }
};
// Admin Login with OTP Validation
exports.login = async (req, res) => {
    //put admin credentials
    const { user_name, password } = req.body;
    if (!user_name || !password) {
        return res.status(400).json({ msg: 'Please enter all fields (user_name, password)' });
    }
    try {
        //validate admin
        const admin = await adminModel.findOne({ user_name });
        if (!admin) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        //if match return jwt to use it for authentications
        const token = jwt.sign(
            { user_name, admin_id: admin._id },
            process.env.TOKEN_KEY,
            { expiresIn: "2h" }
        );
        admin.token = token;
        await admin.save();
        return res.status(200).json({ status: 200, message: 'Admin logged in successfully', token });
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message });
    }
};
//first time qr generation
exports.generateTwoFactor = async (req, res) => {
    const id = req.user.admin_id;
    try {
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(401).json({ status: 401, message: 'Unauthorized user. Only admin can access this.' });
        }
        console.log("admin", admin.token)
        const token = req.headers['x-access-token'];;
        //pass jwt in header for authentciation
        console.log("token", token)
        if (!token || token !== admin.token) {
            return res.status(403).json({ status: 403, msg: 'Unauthorized or invalid token' });
        }
        if (admin.twoFactorEnabled && admin.scanned_status) {
            return res.status(401).json({ status: 401, message: ' You already has otp please use this', scanned_status: admin.scanned_status });

        }
        // Generate OTP secret
        const secret = authenticator.generateSecret();
        console.log("secret", secret);
        admin.twoFactorSecret = secret;
        admin.twoFactorEnabled = true;
        await admin.save();
        // Generate QR code for user to scan
        const otpauthUrl = otplib.authenticator.keyuri(admin.user_name, 'OZ7', secret);
        qrcode.toDataURL(otpauthUrl, (err, imageUrl) => {
            if (err) {
                return res.status(500).json({ status: 500, error: err.message });
            }
            return res.status(200).json({ status: 200, message: 'Admin generate qr code  successfully', scanned_status: admin.scanned_status, qrCodeUrl: imageUrl });
        })
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message });
    }
}
exports.verifyTwoFactor = async (req, res) => {
    const id = req.user.admin_id;
    try {
        console.log("id", id)
        const { otp } = req.body;
        // Validate OTP
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(401).json({ status: 401, message: 'Unauthorized user. Only admin can access this.' });
        }
        const token = req.headers['x-access-token'];
        if (!token || token !== admin.token) {
            return res.status(403).json({ status: 403, msg: 'Unauthorized or invalid token' });
        }
        //verify 2fa
        const isValid = otplib.authenticator.verify({ token: otp, secret: admin.twoFactorSecret });
        // const isValid =true;
        
        if (!isValid) {
            return res.status(401).json({ success: false, message: 'Invalid 2FA token' });
        }
        admin.scanned_status = true;
        await admin.save();
        return res.status(200).json({ status: 200, message: 'Admin verify  successfully', token: admin.token });
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message });
    }
}
//disbale it
exports.disableTwoFA = async (req, res) => {
    const id = req.user.admin_id;
    try {
        // Validate OTP
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(401).json({ status: 401, message: 'Unauthorized user. Only admin can access this.' });
        }
        const token = req.headers['x-access-token'];;
        console.log("token", token)
        if (!token || token !== admin.token) {
            return res.status(403).json({ status: 403, msg: 'Unauthorized or invalid token' });
        }
        //update data in database
        admin.twoFactorEnabled = false;
        admin.twoFactorSecret = null;
        admin.scanned_status = false;
        await admin.save();
        return res.status(200).json({ status: 200, message: 'Admin disable 2FA  successfully' });
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message });
    }
}
//logout
exports.logout = async (req, res) => {
    const { user_name } = req.body;
    // Check if user_name is provided
    if (!user_name) {
        return res.status(400).json({ status: 400, message: 'User name is required' });
    }
    try {
        const admin = await adminModel.findOne({ user_name });
        if (!admin) {
            return res.status(400).json({ msg: 'Invalid user' });
        }

        admin.token = null;
        await admin.save();

        return res.status(200).json({ status: 200, message: 'Admin logged out successfully' });

    } catch (error) {
        return res.status(500).json({ status: 500, error: error.message });
    }
};

//connect wallet
exports.connectWallet = async (req, res) => {
    const id = req.user.admin_id;
    console.log("id", id)
    const { wallet_address } = req.body;
    try {
        const admin = await adminModel.findById(id);
        admin.wallet_address = wallet_address;
        await admin.save();

        return res.status(200).json({ status: 200, message: 'Admin wallet connected Successfully' });
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message })
    }
};

//update data
exports.updateData = async (req, res) => {
    const id = req.user.admin_id; // Assuming you have user authentication
    try {
        // Validate admin
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(401).json({ status: 401, message: 'Unauthorized user only admin can access this' });
        }
        //Add data to update
        let { minimum_purchase, maximum_purchase, presale_allocation, listing_price, tge_date } = req.body;

        // Find the existing data by ID
        const existingData = await data.findOne();
        if (!existingData) {
            return res.status(404).json({ status: 404, message: 'Data not found' });
        }

        // Update fields only if they are provided
        if (minimum_purchase !== undefined) existingData.minimum_purchase = minimum_purchase;
        if (maximum_purchase !== undefined) existingData.maximum_purchase = maximum_purchase;
        if (presale_allocation !== undefined) existingData.presale_allocation = presale_allocation;
        if (listing_price !== undefined) existingData.listing_price = listing_price;
        if (tge_date !== undefined) existingData.tge_date = tge_date;

        // Save the updated data
        await existingData.save();

        return res.status(200).json({ status: 200, message: 'Data Updated Successfully', data: existingData });
    } catch (error) {
        return res.status(500).json({ status: 500, error: error.message });
    }
}

//create data
exports.addData = async (req, res) => {
    try {
        //create the data
        const { minimum_purchase, maximum_purchase, presale_allocation, listing_price, tge_date } = req.body;
        const add_data = new data({
            minimum_purchase, maximum_purchase, presale_allocation, listing_price, tge_date
        })
        await add_data.save();
        return res.status(200).json({ status: 200, message: 'Data Added Successfully' });
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message })
    }
}
//view data
exports.viewData = async (req, res) => {
    try {
        //view data
        const Data = await data.find({}, '-start_text');
        return res.status(200).json({ status: 200, message: 'Data', data: Data });
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message })

    }
}
//update password
exports.updatePassword = async (req, res) => {
    const id = req.user.admin_id; // Assuming you have user authentication

    try {
        // Validate user
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(401).json({ status: 401, message: 'Unauthorized: Admin access required.' });
        }

        const { password } = req.body;

        // Update password and save admin details
        admin.password = password;
        await admin.save();

        return res.status(200).json({ status: 200, message: 'Password updated successfully.' });
    } catch (error) {
        return res.status(200).json({ status: 500, message: 'Server Error: Unable to update password.', error: error.message });
    }
};

//add addresses 
exports.addAddresses = async (req, res) => {
    try {
        const id = req.user.admin_id; // Assuming you have user authentication

        // Validate user
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(401).json({ status: 401, message: 'Unauthorized: Admin access required.' });
        }

        const { audit_link, contract_address, vesting_address } = req.body;

        // Ensure only one address exists: either update or replace the existing document
        const updatedAddress = await addresses.findOneAndUpdate(
            {}, // Find any existing document (empty filter to match all)
            { audit_link, contract_address, vesting_address }, // Fields to update
            { new: true, upsert: true } // new: true returns the updated document, upsert: true creates a new one if not found
        );

        return res.status(200).json({ status: 200, message: "Address added or updated successfully", data: updatedAddress });

    } catch (error) {
        return res.status(500).json({ status: 500, error: error.message });
    }
};

exports.getAudit = async (req, res) => {
    try {
        //fiind the addresses
        const audit = await addresses.find();
        return res.status(200).json({ status: 200, message: "Addresses", data: audit });

    } catch (error) {
        return res.status(500).json({ status: 500, error: error.message });
    }
}
//timer
const countDown = require("../models/countDown");

exports.addOrUpdateDate = async (req, res) => {
    const id = req.user.admin_id; // Assuming you have user authentication
    try {
        // Validate user
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(401).json({ status: 401, message: 'Unauthorized user only admin can access this' });
        }
        const { date } = req.body;
        if (!date) {
            return res.status(400).json({ status: 400, message: "Date is required." });
        }
        // Parse the date input using moment
        const parsedDate = moment(date, "YYYY-MM-DD h:mm A");
        if (!parsedDate.isValid()) {
            return res.status(400).json({ status: 400, message: "Invalid date format. Use 'YYYY-MM-DD h:mm A'." });
        }
        // Convert to UTC format before saving to the database
        const utcDate = parsedDate.utc().toDate();
        // Find if a date already exists, if yes update it, else create a new entry
        const existingData = await countDown.findOne();
        if (existingData) {
            existingData.date = utcDate;
            await existingData.save();
        } else {
            await countDown.create({ date: utcDate });
        }

        return res.status(200).json({ status: 200, message: "Date added/updated successfully.", tge_date: utcDate });
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message });
    }
};
//get the count down
exports.getDate = async (req, res) => {

    try {
        const Data = await countDown.findOne();

        if (!Data || !Data.date) {
            return res.status(404).json({ status: 404, message: "No date found." });
        }

        // Convert the date to the desired format before returning
        const formattedDate = moment(Data?.date).format("YYYY-MM-DD h:mm A");

        return res.status(200).json({ status: 200, date: formattedDate });
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message });
    }
};

exports.startText = async (req, res) => {
    try {
        const id = req.user.admin_id; // Assuming you have user authentication

        // Validate user
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(401).json({ status: 401, message: 'Unauthorized: Admin access required.' });
        }
        //add text
        const { start_text } = req.body;

        // Find the record by start_text; if not found, create a new one
        let admin_data = await data.findOne();

        if (!admin_data) {
            // If no data found, create a new record
            admin_data = new data({ start_text });

        } else {
            // If data is found, update the start_text
            admin_data.start_text = start_text;
        }
        console.log("admin_data", admin_data)
        await admin_data.save();

        return res.status(200).json({
            status: 200,
            message: 'Start text is added/updated successfully',
            text: admin_data.start_text
        });
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Internal server error', error: error.message });
    }
}

