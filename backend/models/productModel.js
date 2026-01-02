const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String,
    price: Number,
    defaultImage: String,
    images: [String],
    isTopBrand: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("product", productSchema); 
