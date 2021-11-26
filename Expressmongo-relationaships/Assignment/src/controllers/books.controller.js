const express = require("express")
const router = express.Router()
const Book = require("../models/book.model")
const Checkout = require("../models/checkout.model")

router.post("", async (req, res) => {
    try{
    const book = await Book.create(req.body)
    res.status(201).send(book)
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
});

router.get("", async (req, res) => {
    try{

        const book = await Book.find().populate({path:"author_id", select: "first_name last_name"}).populate({path: "section_id", select: "name"}).lean().exec()
       return res.status(201).send(book)

    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

router.get("/:id", async (req, res) => {
    try{
    const book = await Book.findById(req.params.id).populate({path:"author_id", select: "first_name last_name"}).populate({path: "section_id", select: "name"}).lean().exec()
    return res.status(201).send(book)
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

router.patch("/:id", async (req, res) => {
    try{
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        }).lean().exec()
        res.status(201).send(book)
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

router.delete("/:id", async (req, res) => {
    try{
        const book = await Book.findByIdAndDelete(req.params.id).lean().exec()
        res.status(201).send(book)
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})




module.exports = router