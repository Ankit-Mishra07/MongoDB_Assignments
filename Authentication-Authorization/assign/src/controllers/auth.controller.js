
const jwt = require("jsonwebtoken")

const newToken = (user) => {
    return jwt.sign({id : user.id})
}

const signup = async (req, res) => {
    const token = "abcd"
   return res.status(201).json({data: token})
}

const signin = async (req, res) => {
    return res.send("user")
}

module.exports = {
    signup,
    signin
}