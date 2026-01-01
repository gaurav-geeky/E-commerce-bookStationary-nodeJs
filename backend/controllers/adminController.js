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
    try {
        const { adminemail, password } = req.body;

        const admin = await adminModel.findOne({ adminemail });

        if (!admin || admin.password !== password) {
            return res.status(401).send("Invalid credentials");
        }

        res.status(200).send("Login successful");

    } catch (err) {
        res.status(500).send("Server error");
    }
};

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

            res.status(200).send({ msg: "Data saved successfully!", product });
        }
        catch (error) {
            res.status(500).send("Error saving data: " + error.message);
        }
    });
}

const ShowProduct = async (req, res) => {
    const myproduct = await productModel.find();
    res.status(200).send({ msg: "ok product data found", myproduct });
}

const ProductDelete = async (req, res) => {
    const { id } = req.query;
    const product = await productModel.findByIdAndDelete(id);
    res.send({ msg: "Ok product deleted", product });
}

const ProductUpdate = async (req, res) => {
    // console.log(req.body);
    const { _id, name, category, description, price } = req.body;
    const editData = await productModel.findByIdAndUpdate(_id, {
        name: name,
        category: category,
        description: description,
        price: price,
    })
    res.send({ msg: "okk edit data", editData });
}


const ProductSearch = async (req, res) => {
    try {
        const { search } = req.body;

        if (!search || !search.trim()) {
            return res.status(400).json({ msg: "search value required" });
        }

        const proData = await productModel.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ]
        });
        res.send(proData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    adminLogin,
    addProduct,
    ShowProduct,
    ProductDelete,
    ProductUpdate,
    ProductSearch,


}

