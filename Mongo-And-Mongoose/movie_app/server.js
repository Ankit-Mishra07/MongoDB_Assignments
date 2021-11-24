const express = require("express")

const mongoose = require("mongoose")

const app = express()

app.use(express.json())

// connect to mongodb server
// creat a schema for a data
// creat a model from the schema


const connect = () => {
    return mongoose.connect("mongodb+srv://AnkitMishra07:ankit07@cluster0.jxwud.mongodb.net/entertainment")

}

const  movieSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    movie_name : {type : String, required: true},
    movie_genre: {type: String, required:true},
    production_year: {type: Number, required:false},
    budget: {type: Number, required : false}

}, {
    versionKey: false,
    timestamps: true
})

const movie = mongoose.model("movie", movieSchema)



app.get("/movies", async (req, res) => {

    try {

        const movies = await movie.find().lean().exec(); 
        res.status(201).send({movies})

    }catch(e) {
        res.status(500).json({message: e.message, status: "Failed"});
    }
})

app.post("/movies", async (req, res) => {
    try{
        const movies = await movie.create(req.body)
        res.status(201).send(movies)
    }catch(e) {
        res.status(500).json({message: e.message, status: "Failed"})
    }
})

app.get("/movies/:id", async (req, res) => {

    try{

        const movies = await movie.findById(req.params.id).lean().exec()
        res.send(movies)

    }catch(e) {
        res.status(500).json({message: e.message, status: "Failed"})
    }

})

app.patch("/movies/:id" , async (req, res) => {

    try{

        const movies = await movie.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).lean().exec()
       return res.status(201).send(movies)

    }catch(e) {
      return  res.status(500).json({message: e.message, status: "Failed"})
    }

})

app.delete("/movies/:id" , async (req, res) => {

    try{

        const movies = await movie.findByIdAndDelete(req.params.id).lean().exec()
        res.status(201).send(movies)

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }

})







app.listen(2006, async () => {
    await connect()
    console.log("Listening on PORT 2006")
})





















// front to backend ->
//express-formidable
//const formidable = require('express-formidable');
//app.use(formidable());


//db.users.dropIndex("your_index_name_here")  is this command to remove index
