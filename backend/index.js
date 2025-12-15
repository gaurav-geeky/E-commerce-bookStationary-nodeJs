//  EcomBookFinal

const express = require('express');
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
const AdminRoute = require("./routes/adminRoute"); 

mongoose.connect(process.env.DBCON).then(()=> {
    console.log(`db connect for ecomm nodejs`)
})

// Use body-parser middleware for JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/admin', AdminRoute)


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server runs at http://localhost:${port}`);
})

