//  EcomBookFinal

const express = require('express');
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");

const AdminRoute = require("./routes/adminRoute");
const ProductRoute = require("./routes/productRoute");  

mongoose.connect(process.env.DBCON).then(()=> {
    console.log(`db connect for ecomm nodejs`)
})

// Use body-parser middleware for JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/admin', AdminRoute)
app.use('/product', ProductRoute)


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server runs at http://localhost:${port}`);
})

