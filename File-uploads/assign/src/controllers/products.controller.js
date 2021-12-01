const express = require("express")

const router = express.Router()

const Product = require("../models/product.model")

const upload = require("../middlewares/uploads")

router.post("/", upload.single("image_urls"), async (req, res) => {
    try{
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image_urls: req.file.path,
        })

        return res.status(201).json({product})
    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})


router.post("/multiple", upload.any("image_urls"), async (req, res) => {

    const filePaths = req.files.map((file) => file.path);

    try{

        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image_urls: filePaths,
        })

        return res.status(201).json({product})
    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})


module.exports = router