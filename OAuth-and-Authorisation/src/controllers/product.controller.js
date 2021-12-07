const express = require("express")

const router = express.Router();

const Product = require("../models/product.model")

router.post("/", async (req, res) => {

    try{

        const user = req.user

        const product = await Product.create({
            name : req.body.name,
            price : req.body.price,
            user : user.user._id
        }).populate("user")

        res.status(201).json({product})

    }catch(e) {
        
    }
})

module.exports = router