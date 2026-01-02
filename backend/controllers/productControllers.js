
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");
const randompass = require('../middleware/randomPassword');
const emailsend = require('../middleware/nodemail');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET
const orderModel = require('../models/order');


const brandDisplay = async (req, res) => {
    try {
        // 👇 fetch ONLY top brand products
        const products = await productModel.find({ isTopBrand: true });

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            msg: "Failed to fetch top brand products"
        });
    }
};


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
        return res.status(400).send({ msg: "Invalid email" });
    }

    const passValid = await bcrypt.compare(password, user.password);

    if (!passValid) {
        return res.status(400).send({ msg: "Invalid password." });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "3d" });

    return res.send({ msg: "user login successfull", user, token });
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

const SaveAddress = async (req, res) => {
    const { userid, address } = req.body
    if (!userid || !address) {
        res.status(401).json({ msg: "No userId and Address!" })
    }
    const user = await userModel.findByIdAndUpdate(userid,
        { alternateaddress: address }
    )
    res.status(200).json({ msg: "Alternate address saved.", user });
}

const SaveInstruction = async (req, res) => {
    const { userid, instruction } = req.body
    if (!userid || !instruction) {
        res.status(401).json({ msg: "No userId and Instructions!" })
    }
    const user = await userModel.findByIdAndUpdate(userid,
        { instructions: instruction }
    )
    res.status(200).json({ msg: "Alternate address saved.", user });
}

const SaveOrder = async (req, res) => {

    console.log("product BODY:", req.body);
    const { name, userId, products, totalPrice } = req.body;
    try {
        const saveorder = await orderModel.create({
            name: name,
            userId: userId,
            products: products,
            totalPrice: totalPrice,
        });
        res.status(201).json({ saveorder, msg: "Order successfull" });
    }
    catch (error) {
        res.status(500).json({ msg: "Order save failed" });
    }
};

const GetOrder = async (req, res) => {
    const order = await orderModel.find().populate("userId");
    res.json({ order, msg: "ok got order data" });
}

const GetInvoice = async (req, res) => {
    try {
        const { orderId } = req.params;
        console.log("Invoice Order ID:", orderId);

        const order = await orderModel.findById(orderId);

        if (!order) {
            return res.status(404).json({
                msg: "Order not found"
            });
        }
        res.status(200).json({ order, msg: "ok got order detail using orderId" });

    } catch (error) {
        console.log("GetInvoice Error:", error);

        res.status(500).json({
            msg: "Failed to fetch invoice"
        });
    }
};




module.exports = {
    brandDisplay,
    userRegisteration,
    userLogin,
    userAuth,
    SaveAddress,
    SaveInstruction,
    SaveOrder,
    GetOrder,
    GetInvoice,

}




