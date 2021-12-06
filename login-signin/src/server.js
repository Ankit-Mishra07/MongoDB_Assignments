const express = require("express")
const mongoose = require("mongoose")


const app = express()

app.use(express.json())


const {signup, signin} = require("./controllers/auth.controller")

app.post("/signup", signup)
app.post("/signin", signin)

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/form")
}

app.listen(4321, async () => {
    await connect()
    console.log("Listening on PORT 4321")
})