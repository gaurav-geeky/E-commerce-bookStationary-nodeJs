
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const randompass = require('../middleware/randomPassword');
const emailsend = require('../middleware/nodemail');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET


const brandDisplay = async (req, res) => {
    const product = await productModel.find();
    res.status(200).send(product, { msg: "ok product info." });
}

const userRegisteration = async (req, res) => {
    const { name, email, contact, city, address, pincode } = req.body;
    const ranpass = randompass.Password();
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

const userLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });

    if (!user) {
        res.status(400).send({ msg: "Invalid email" });
    }

    const passValid = await bcrypt.compare(password, user.password);

    if (!passValid) {
        res.status(400).send({ msg: "Invalid password." });
    }


    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "3d" });

    res.send({ msg: "ok login", user, token });
}

// function inside login for authentication. 
const userAuth = async (req, res) => {
    const token = req.header("auth-token");

    if (!token) return res.status(400).json("No token found.");

    try {
        const decode = await jwt.verify(token, secret);

        const user = await userModel.findById(decode.id).select("-password -email");
        res.status(200).json({ msg: `ok, ${user.name}'s token is verified.`, user });
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    brandDisplay,
    userRegisteration,
    userLogin,
    userAuth,

}



