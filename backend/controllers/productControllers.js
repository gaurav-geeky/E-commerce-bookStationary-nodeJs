
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const userpass = require('../middleware/randomPassword');
const emailsend = require('../middleware/nodemail'); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const brandDisplay = async (req, res) => {
    const product = await productModel.find();
    res.status(200).send(product, { msg: "ok product info." });
}

const userRegisteration = async (req, res) => {
    const { name, email, contact, city, address, pincode } = req.body;
    const ranpass = userpass.Password();
    const hashpass = await bcrypt.hash(ranpass, 10); 

    console.log(`users password is ${ranpass}`); 

    emailsend.userNodeMail(name, email, ranpass); 

    const user = await userModel.create({
        name: name,
        email: email,
        contact: contact,
        city: city,
        shippingadd: address,
        pincode: pincode,
        password: hashpass,
    }) 

    res.status(200).json({ user, msg: "ok user is registered now.." });
}

module.exports = {
    brandDisplay,
    userRegisteration,

}



