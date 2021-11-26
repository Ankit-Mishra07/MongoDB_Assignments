const app = require("./index.js")

const connect = require("./configs/db")

app.listen(2009, async() => {
    await connect()
    console.log("listening on post 2009")
})
