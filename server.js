require("dotenv").config()

const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
  res.send("Hello World")
})

app.listen(process.env.PORT, () => {
  console.log("App runs at ", process.env.PORT)
})
