const express = require("express");
const route = express.Router();
const ProductController = require('../controllers/productControllers');

route.get("/branddisplay", ProductController.brandDisplay);
route.post("/registration", ProductController.userRegisteration);
route.post("/login", ProductController.userLogin);
route.get("/auth", ProductController.userAuth);
route.post("/saveaddress", ProductController.SaveAddress);
route.post("/saveinstruction", ProductController.SaveInstruction);

route.post("/saveorder", ProductController.SaveOrder);
route.get("/getorder", ProductController.GetOrder);


module.exports = route;

