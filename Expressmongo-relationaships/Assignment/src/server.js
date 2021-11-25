const app = require("./index.js")

const connect = require("./configs/db")

app.listen(2008, async () => {
    await connect()
    console.log("Listening on PORT 2008")
})