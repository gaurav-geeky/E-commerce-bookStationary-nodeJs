const express = require("express");
const route = express.Router();
const ProductController = require('../controllers/productControllers');

route.get("/branddisplay", ProductController.brandDisplay);
route.post("/registration", ProductController.userRegisteration);
route.post("/login", ProductController.userLogin);
route.get("/auth", ProductController.userAuth);



module.exports= route;