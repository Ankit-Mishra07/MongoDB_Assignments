const express = require("express")
router = express.Router()

const Checkout = require("../models/checkout.model")
const Book = require("../models/book.model")
 const Author = require("../models/author.model")
const Section = require("../models/section.model")

router.get("/checkedout", async (req, res) => {
    try{

        const checked = await Checkout.find().populate({path: "book_id"}).lean().exec()
        res.status(201).send(checked)
    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

router.get("/author/:id/books", async(req, res) => {
    try{

        const author = await Author.findById(req.params.id).lean().exec()
        const books  = await Book.find({author_id: author._id}).lean().exec()
        res.send({books})

    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

router.get("/section/:id/books", async(req, res) => {
    try{

        const section = await Section.findById(req.params.id).lean().exec()
        const books  = await Book.find({section_id: section._id}).lean().exec()
        res.send({books})

    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})


router.get("/section/:id/booksnot", async(req, res) => {
    try{

        const section = await Section.findById(req.params.id).lean().exec()
        const books  = await Book.find({section_id: section._id}).lean().exec()
        const checked = await Checkout.find().lean().exec()
            let arr = []
     

            for(let i = 0; i < books.length; i++) {
               let flag = true
                for(let j = 0; j < checked.length; j++){
                    if(books[i]._id !== checked[j].book_id){
                        flag = false
                        break;
                    }
                }
                if(flag === true) {
                arr.push(books[i])
                }
            }
         res.send(checked)

    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})



router.get("/section/:sectionid/:authorid", async(req, res) => {
    try{

        const section = await Section.findById(req.params.sectionid).lean().exec()
        const author = await Author.findById(req.params.authorid).lean().exec()
        const books  = await Book.find({section_id: section._id, author_id: author._id}).lean().exec()
        res.send(books)

    }catch(e){
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})


module.exports = router;