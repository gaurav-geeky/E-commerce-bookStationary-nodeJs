

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    // which user placed the order
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    // products ordered
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            quantity: Number
        }
    ],

    // user address at time of order
    name: String,
    city: String,
    shippingadd: String,
    pincode: Number,

    totalAmount: Number
});

module.exports = mongoose.model("order", orderSchema);
