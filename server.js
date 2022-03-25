require("dotenv").config()

const jwt = require("jsonwebtoken")
const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/generate-api-key/:accesskey", async (req, res) => {
  if (!req.params.accesskey) res.status(401).json({ message: "Please Provide Access Key" })
  if (req.params.accesskey !== process.env.ACCESS_KEY) res.status(401).json({ message: "Invalid Access Key" })

  const anyData = { id: 1 }
  const token = jwt.sign({ id: anyData.id.toString() }, process.env.TOKEN_SECRET, { expiresIn: "365d" })
  res.status(200).json({ message: "successfully generated token", token })
})

const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"]
  
    if (!token) {
      return res.status(403).send("A token is required for authentication")
    }
    try {
      const decoded = jwt.verify(token, TOKEN_SECRET)
      req.user = decoded
    } catch (err) {
      return res.status(401).send("Invalid Token")
    }
    return next()
  }



app.get("/", verifyToken, async (req, res) => {
  res.send("Hello World")
})

app.listen(process.env.PORT, () => {
  console.log("App runs at ", process.env.PORT)
})
