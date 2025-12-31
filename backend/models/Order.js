const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        products: [
            {
                name: {
                    type: String,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],

        totalPrice: {
            type: Number,
            required: true,
        },

        // 🔹 Payment related (recommended)
        paymentId: {
            type: String,
            default: null,
        },

        orderStatus: {
            type: String,
            enum: ["PENDING", "PAID", "CANCELLED"],
            default: "PAID",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

