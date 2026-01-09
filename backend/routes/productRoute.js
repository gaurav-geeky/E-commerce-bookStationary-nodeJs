const express = require("express");
const route = express.Router();
const ProductController = require('../controllers/productControllers');

// user Routes
route.post("/registration", ProductController.userRegisteration);
route.post("/login", ProductController.userLogin);
route.get("/auth", ProductController.userAuth);


// product Routes
route.get("/branddisplay", ProductController.brandDisplay);
route.post("/saveaddress", ProductController.SaveAddress);
route.post("/saveinstruction", ProductController.SaveInstruction);

route.post("/saveorder", ProductController.SaveOrder);
route.get("/getorder", ProductController.GetOrder);

route.post("/saveorder", ProductController.SaveOrder);
route.get("/getinvoice/:orderId", ProductController.GetInvoice);

route.get("/getbooks", ProductController.GetBooks);
route.get("/getpenpencils", ProductController.GetPenPencils);


route.get("/getproductdetail/:proId", ProductController.GetProductDetails);

module.exports = route;

 