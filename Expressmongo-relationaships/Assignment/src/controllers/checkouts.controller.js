const express = require("express")

const router = express.Router()

const Checkout = require("../models/checkout.model")

router.post("", async (req, res) => {
    try{
    const checkout = await Checkout.create(req.body)
    res.status(201).send(checkout)
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
});

router.get("", async (req, res) => {
    try{

        const checkout = await Checkout.find().populate({path: "book_id", select: "name body"}).lean().exec()
       return res.status(201).send(checkout)

    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

router.get("/:id", async (req, res) => {
    try{
    const checkout = await Checkout.findById(req.params.id).populate({path: "book_id", select: "name body"}).lean().exec()
    return res.status(201).send(checkout)
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

router.patch("/:id", async (req, res) => {
    try{
        const checkout = await Checkout.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).lean().exec()
        res.status(201).send(checkout)
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const checkout = await Checkout.findByIdAndDelete(req.params.id).lean().exec()
        res.status(201).send(checkout)
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

module.exports = router