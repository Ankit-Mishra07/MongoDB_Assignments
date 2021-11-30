const express = require("express")

const router = express.Router();

const User = require("../models/user.model")

const transporter = require("../configs/mails")

router.post("/" , async (req, res) => {
    try{
    const user = await User.create(req.body)
    const admins = await User.find({role: "admin"})

    const message = {
        from: "ankitmi116@gmail.com",
        to: req.body.email ,
        subject: `Welcome to ABC system ${req.body.first_name}  ${req.body.last_name}`,
        text: `Hi  ${req.body.first_name}, Please confirm your email address`,
        html: `<h1>Hi  ${req.body.first_name}, Please confirm your email address</h1>`
      };

 

    for(let i = 0; i < 5; i++) {
      
    const msg_admin = {
        from: "ankitmi116@gmail.com",
        to: admins[i].email,
        subject: `${req.body.first_name} ${req.body.last_name} has registered with us`,
        text: `Please welcome ${req.body.first_name} ${req.body.last_name}`,
        html: `<h1>Please welcome ${req.body.first_name} ${req.body.last_name}</h1>`
      };
      transporter.sendMail(msg_admin)
    }

      transporter.sendMail(message)
     

    res.status(201).send(user)
    }catch(e) {
        res.status(500).json({message: e.message, status : "Failed"})
    }
})


router.get("/" , async (req, res) => {
    try{

    

    const page = +req.query.page || 1
    const size = +req.query.size || 2
    const skip = (page - 1) * size 
    const user = await User.find().skip(skip).limit(size).lean().exec();
    const totalPages = Math.ceil(
        (await User.find().countDocuments()) / size
    )
    res.status(201).send({user, totalPages})
    }catch(e) {
        res.status(500).json({message: e.message, status : "Failed"})
    }
})

module.exports = router;