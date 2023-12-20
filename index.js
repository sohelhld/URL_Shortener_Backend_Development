const express = require('express')
const { connected } = require('./db')
const { userRouter } = require('./router/user.router')
var cookieParser = require('cookie-parser')
const { shortRouter } = require('./router/shortener.router')
const { auth } = require('./middleware/auth.middleware')
const app = express()
require("dotenv").config()

app.use(cookieParser())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("ok")
})

app.use("/user",userRouter)
// app.use(auth)
app.use("/",shortRouter)

app.listen(process.env.PORT,async(req,res)=>{
    try {
        await connected
        console.log("Connected with db")
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is connected on port 8080")
})