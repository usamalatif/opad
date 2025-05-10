const adminModel = require("../models/adminModel");
const data = require("../models/data");
const pressaleStagesModel = require("../models/pressaleStagesModel");
const usersModel = require("../models/usersModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { ethers } = require("ethers");

const verifySignature = async (message, signature, wallet_address) => {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === wallet_address.toLowerCase();
};

exports.userLogin = async (req, res) => {
    try {
        //user login n signup
        const { wallet_address, signature } = req.body;
        const message = `Sign this message to verify your wallet: ${wallet_address}`;
        const isVerified = await verifySignature(message, signature, wallet_address);
        if (!isVerified) {
            return res.status(200).json({ status: 401, message: "Unauthorized user" });
        }

        const user = await usersModel.findOne({ wallet_address });
        if (!user) {
            //if user is not existed register its account
            console.log("register")
            const new_user = new usersModel({
                wallet_address: wallet_address,
                signature: signature
            });

            const token = jwt.sign(
                { wallet_address },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                },
            );
            new_user.token = token;
            await new_user.save();
            return res.status(200).json({ status: 200, message: 'User Registered Successfully', token: new_user.token });
        }
        else {
            //validate by signature
            if (user.signature !== signature) {
                return res.status(200).json({ status: 401, message: "Unauthorized user" })
            } else {
                console.log("sign in")
                const token = jwt.sign(
                    { wallet_address },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h",
                    },
                );
                user.token = token;
                await user.save();
                return res.status(200).json({ status: 200, message: 'User sign in Successfully', token });
            }


        }
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message })
    }
}

exports.viewPresales = async (req, res) => {
    // const wallet_address = req.user.wallet_address;
    try {
        // const user = await usersModel.findOne({ wallet_address });
        // if (!user) {
        //     return res.status(200).json({ status: 401, message: 'Unauthorized user want to acecess' });
        // }
        const presales = await pressaleStagesModel.find();
        return res.status(200).json({ status: 200, message: 'presales stages', data: presales });

    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message })
    }
}

// Endpoint to check if a token is expired
exports.checkToken = async (req, res) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        // If the token is valid and not expired
        const user = await usersModel.findOne({ token: token });
        const admin = await adminModel.findOne({ token: token });
        if (!user && !admin) {
            return res.status(401).json({ status: false, message: "Token has expired" });
        }
        return res.status(200).json({ status: true, message: "Token is valid", decoded });
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ status: false, message: "Token has expired" });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ valid: false, message: "Invalid token" });
        } else {
            return res.status(500).json({ message: "Failed to verify token", error: err.message });
        }
    }
}
//get text data 
exports.viewText = async (req, res) => {
    try {
        const text = await data.findOne();
        return res.status(200).json({ status: 200, message: 'start text', data: text.start_text })
    } catch (error) {
        return res.status(200).json({ status: 500, error: error.message })
    }
}