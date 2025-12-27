const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

const authMiddleware = async (req, res, next) => {
    try {
        // 1️⃣ Get token from headers
        const token = req.headers["auth-token"];

        if (!token) {
            return res.status(401).json({
                success: false,
                msg: "No token, authorization denied",
            });
        }

        // 2️⃣ Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3️⃣ Get user from DB
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                msg: "User not found",
            });
        }

        // 4️⃣ Attach user to request
        req.user = user;

        next(); // ✅ allow route access
    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: "Invalid or expired token",
        });
    }
};

module.exports = authMiddleware;
