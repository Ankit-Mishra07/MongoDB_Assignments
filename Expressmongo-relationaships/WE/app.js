const express = require("express")
const mongoose = require("mongoose")

const app = express()
app.use(express.json())

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/test")
}


// USERS Schema

const userSchema = new mongoose.Schema(
    {
    first_name: {type: String, required:true},
    last_name: {type: String, required:true},
    email: {type: String, required:true, unique: true},
    gender: {type: String, required: false, default: "Female"},
    age: {type: String, required: false}
    },
    {
        versionKey: false,
        timestamps: true,

    });

const User = mongoose.model("user", userSchema)

// POSTS Schema

const postSchema = new mongoose.Schema({

    title : {type: String ,required: true},
    body: {type: String, required: true},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    tag_ids : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag",
        required: true
    }]

},
{
        versionKey: false,
        timestamps: true
}
)

const Post = mongoose.model("post", postSchema)

// Comment Mongoose   => Post and comment are one to many relationship

const commentSchema = new mongoose.Schema({
    body: {type: String, required:true},
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true
    }

}, {
    versionKey: false,
    timestamps: true
})



const Comment = mongoose.model("comment", commentSchema)


// Tag Schema

const tagSchema = new mongoose.Schema({
    name: {type: String, required: true}

},{
    versionKey: false,
    timestamps: true
})

const Tag = mongoose.model("tag", tagSchema)



/*
  users
  post = /users
  get all = /users
  get one = /users/:id
  update one = /users/:id
  delete one = /users/:id
*/


// USERS CRUD ------------------------------


app.post("/users" , async (req, res) => {

    try{

        const user = await User.create(req.body)
      return res.status(201).send(user)

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed" })
    }

})


app.get("/users", async (req, res) => {
    try{

      const users = await User.find().lean().exec()

      return res.status(201).send(users)

    }catch(e) {
      return  res.status(500).json({message: e.message, status: "Failed"})
    }
})

app.get("/users/:id", async (req, res) => {

    try{

        const user = await User.findById(req.params.id)
        return res.send(user)

    }catch(e) {
        return res.status(500).json({message: e.message, status : "Failed" })
    }

})

app.patch("/users/:id", async (req, res) => {
    try{

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new : true
        }).lean().exec()

        return res.status(201).send(user)

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

app.delete("/users/:id" , async (req, res) => {
    try{

        const user = await User.findByIdAndDelete(req.params.id).lean().exec()
        return res.status(201).send(user)


    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})




// TAG CRUD------------------------>

app.post("/tags", async (req, res) => {

    try{

        const tag = await Tag.create(req.body)
       return res.status(201).send(tag)
    }catch(e) {
       return res.status(500).json({message: e.message, status: "Failed"})
    }
})

app.get("/tags", async (req, res) => {
    try{
        const tag = await Tag.find().lean().exec()
        res.status(201).send(tag)
    }catch(e) {
        res.status(500).json({message: e.message, status: "Failed"})
    }
})

app.get("/tags/:id", async (req, res) => {
    try{

        const tag = await Tag.findById(req.params.id).lean().exec()
       return res.status(201).send(tag)

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})

app.patch("/tags/:id", async (req, res) => {
    try{
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }).lean().exec()
    return res.status(201).send(tag)
}catch(e) {
    return res.status(500).json({message: e.message, status: "Failed"})
}

})

app.delete("/tags/:id", async (req, res) => {
    try{
        const tag = await Tag.findByIdAndDelete(req.params.id).lean().exec()
        res.status(201).send(tag)

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})


// to get the posts in which particular tag is present

app.get("/tags/:id/posts", async (req, res) => {
    try{

        const tag = await Tag.findById(req.params.id).lean().exec()
        const posts = await Post.find({tag_ids: tag_id}).populate("tag_ids").lean().exec()
        return res.status(201).send({posts, tag})

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})



// POSTS CRUD -------------------------->

app.post("/posts" , async (req , res) => {

    try{
        const post = await Post.create(req.body)
        return res.status(201).send(post)
    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }

})

app.get("/posts", async (req, res) => {
    try{

        const post = await Post.find().populate({path: "user_id", select: "first_name"}).lean().exec()
        return res.status(201).send(post)

    }catch(e) {
        return res.status(500).json({message: e.message, status: "Failed"})
    }
})












app.listen(2007, async () => {
    await connect()
    console.log("Listening on PORT 2007")
})