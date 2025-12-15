const express = require('express'); 
const route = express.Router(); 
const adminController = require("../controllers/adminController"); 

route.post("/login", adminController.adminLogin); 
route.post("/addproduct", adminController.addProduct); 


module.exports = route; 
