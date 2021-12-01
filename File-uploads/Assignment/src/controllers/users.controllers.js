const express = require("express")

const router = express.Router()

const User = require("../models/user.model")


const upload = require("../middlewares/uploads")


router.post("/", upload.single("profile_pic"), async (req, res) => {
    try{

        const user = await User.create({
            first_name : req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path,
        })

        return res.status(201).json({user})

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

module.exports = router