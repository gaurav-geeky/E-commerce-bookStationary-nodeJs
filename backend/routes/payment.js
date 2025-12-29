const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

/* ---------------- CREATE ORDER ---------------- */

router.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZOR_ID,          
            key_secret: process.env.RAZOR_SECRET, 
        });

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        instance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Something went wrong while creating order"
                });
            }

            res.status(200).json({
                success: true,
                data: order
            });
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

/* ---------------- VERIFY PAYMENT ---------------- */

router.post("/verify", async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: "Missing Razorpay fields"
            });
        }

        const sign = `${razorpay_order_id}|${razorpay_payment_id}`;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZOR_SECRET)
            .update(sign)            // 🔴 CHANGED: removed toString() (optional cleanup)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            return res.status(200).json({
                success: true,
                message: "Payment verified successfully"
            });
        }

        return res.status(400).json({
            success: false,
            message: "Invalid payment signature"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

module.exports = router;
