const express = require("express");
const route = express.Router();
const ProductController = require('../controllers/productControllers');

route.get("/branddisplay", ProductController.brandDisplay);
route.post("/registration", ProductController.userRegisteration);



module.exports= route;