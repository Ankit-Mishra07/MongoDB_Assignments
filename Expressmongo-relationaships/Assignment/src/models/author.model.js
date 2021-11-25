const mongoose = require("mongoose")

const authorSchema = mongoose.Schema({
    first_name: {type:String, required: true},
    last_name: {type:String, required: true},
})