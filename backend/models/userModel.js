
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
    city: String,
    shippingadd: String,
    pincode: Number,
    alternateaddress: String, 
    instructions: String, 
    password: String,
}); 

module.exports = mongoose.model("User", userSchema);

