const express = require("express")

const mongoose = require("mongoose")

const app = express();

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/movie_application", {
        useNewUrlParser : true,
        useCreateIndex : true,
        useUnifiedTopology : true,
    })
}

const userSchema = new mongoose.Schema({
    id: Number,
    movie_name : String,
    movie_genre: String,
    production_year: Number,
    budget: Number
})

const Movie = mongoose.model("movies", userSchema)

const start = async () => {
    await connect()
    app.listen(2005, () => {
        console.log("Listening on PORT 2005")
    })
}
start()