const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    name: String,
    address: String,
    products: [
        {
            name: String,
            quantity: Number
        }
    ],
    totalPrice: Number
}, { timestamps: true });

module.exports = mongoose.model("order", orderSchema); 


