
const jwt = require("jsonwebtoken")

require("dotenv").config();

const User = require("../models/user.model")

const newToken = (user) => {
    return jwt.sign({id : user.id}, process.env.JWT_SECRET_KEY);
}

const signup = async (req, res) => {

    try {

    const user = await User.create(req.body)
    const token = newToken(user);
   return res.status(201).json({data: token})
    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
}

const signin = async (req, res) => {
    // we will try to find with the email address
    try {

    const user = await User.findOne({email: req.body.email}).lean().exec()

    if(!user){ return res.status(401).json({status: "Failed", message: "Your email or password is not correct"}) }



    

}catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }

    
    try {
    //we will try to match the password the user has the password store in the system;
    const match = await User.checkPassword(req.body.password)
    if(!match) {
        return res.status(401).json({status: "Failed", message: "Your email or password is not correct"})
    }
    //create a new token and return 1
    const token = newToken(user)
    res.status(201).json({data: token})
}catch(e) {
    return res.status(500).json({message: e.message, status: "Failed"})
}


}

module.exports = {
    signup,
    signin
}