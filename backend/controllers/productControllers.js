
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");



const brandDisplay = async (req, res) => {
    const product = await productModel.find();
    res.status(200).send(product, { msg: "ok product info." });
}

const userRegisteration = async (req, res) => {
    console.log(req.body)
    const { name, email, contact, city, address, pincode } = req.body;

    const user = await userModel.create({
        name: name,
        email: email,
        contact: contact,
        city: city,
        shippingadd: address,
        pincode: pincode,
    })

    res.status(200).json({ user, msg: "ok user is registered now.." });
}

module.exports = {
    brandDisplay,
    userRegisteration,

}



