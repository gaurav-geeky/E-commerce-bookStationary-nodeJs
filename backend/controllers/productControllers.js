
const productModel = require("../models/productModel");

const brandDisplay = async (req, res) => {
    const product = await productModel.find();
    res.status(200).send(product, { msg: "ok product info." });
}

module.exports = {
    brandDisplay
}