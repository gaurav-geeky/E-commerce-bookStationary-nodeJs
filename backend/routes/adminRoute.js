const express = require('express'); 
const route = express.Router(); 
const adminController = require("../controllers/adminController"); 

route.post("/login", adminController.adminLogin); 
route.post("/addproduct", adminController.addProduct); 
route.get("/showproduct", adminController.ShowProduct); 
route.delete("/productdelete", adminController.ProductDelete); 
route.put("/productupdate", adminController.ProductUpdate); 


module.exports = route; 
