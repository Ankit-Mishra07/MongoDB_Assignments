require("dotenv").config()

const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const newToken = (user) => {
    return jwt.sign({user : user}, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
    try {

        let user = await User.findOne({email : req.body.email}).lean().exec()

        if(user) {
            return res.status(400).json({
                status : "Failed",
                message: "Please provide a different email address",
            })
        }

        user = await User.create(req.body) 
        
        const token = newToken(user);

        res.status(201).json({user, token})

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
}


module.exports = {
    register
}