const express = require("express");
const route = express.Router();
const ProductController = require('../controllers/productControllers');
const auth = require("../middleware/Auth");

route.get("/branddisplay", ProductController.brandDisplay);
route.post("/registration", ProductController.userRegisteration);
route.post("/login", ProductController.userLogin);
route.get("/auth", ProductController.userAuth);
route.post("/saveaddress", auth, ProductController.SaveAddress);
route.post("/saveinstruction", auth, ProductController.SaveInstruction); 

route.post("/saveorder", auth, ProductController.SaveOrder);


module.exports = route;

