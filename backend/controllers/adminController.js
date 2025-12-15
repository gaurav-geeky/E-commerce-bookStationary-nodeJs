const adminModel = require("../models/adminModel");
const productModel = require("../models/productModel");

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../Cloudinary');

// set up cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "book_images",            // Cloudinary folder name
        format: async (req, file) => 'jpg',         // auto detects image/video/pdf
        public_id: (req, file) => Date.now() + '-' + file.originalname,
    },
});

const upload = multer({ storage: storage }).array('images', 10); // image size


const adminLogin = async (req, res) => {
    const { adminemail, password } = req.body;

    const admin = await adminModel.findOne({ adminemail: adminemail });

    try {
        if (!admin) {
            res.status(401).send("Invalid admin email");
        }
        if (admin.password != password) {
            res.status(401).send("Invalid admin Password");
        }
        res.status(201).send("login successfull");
    }
    catch (error) {
        res.status(401).send("login failed");
    }

}

const addProduct = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).send("Error uploading files: " + err.message);
        }
        try {
            const { name, category, description, price } = req.body;
            const imageUrls = req.files.map(file => file.path);

            const product = await productModel.create({
                name: name,
                category: category,
                description: description,
                price: price,
                defaultImage: imageUrls[0],
                images: imageUrls
            })

            res.status(200).send({msg: "Data saved successfully!", product});
        }
        catch (error) {
            res.status(500).send("Error saving data: " + error.message);
        }
    }); 
}

module.exports = {
    adminLogin,
    addProduct,
}

