const app = require("./index.js")

const connect = require("./configs/db")

app.listen(2007, async () => {
    await connect()
    console.log("Listening on PORT 2007")
})