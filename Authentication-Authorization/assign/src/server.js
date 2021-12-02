const app = require("./index")

const connect = require("./configs/db")

app.listen(2024, async () => {
    await connect()
    console.log("Listening on Port 2024...")
})