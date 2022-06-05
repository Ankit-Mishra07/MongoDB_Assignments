const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// storage engine

const storage = multer.diskStorage({
    destination:"./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


const upload = multer({
    storage:storage,
    limits:{
        fileSize:1000000000000
    }
})

app.use("/profile", express.static('upload/images'))

app.post("/upload", upload.single("profile"),(req, res) => {
    res.json({
        success:true,
        profile_url:`http://localhost:4000/profile/${req.file.filename}`
    })
})


//Error handler
function errHandler(err, req, res, next){
    if(err instanceof multer.MulterError) {
        res.json({
            success:false,
            message:err.message
        })
    }
}
app.use(errHandler)



app.listen(4000, () => {
    console.log("server is running on 4000");
})