const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "A token is required for authentication" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired" });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        } else {
            return res.status(500).json({ message: "Failed to authenticate token" });
        }
    }

    // Proceed to the next middleware or route handler
    return next();
};

module.exports = verifyToken;
