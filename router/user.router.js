const express = require('express');
const { userModel } = require('../models/user.models');
const bcrypt= require('bcrypt');
const jwt = require("jsonwebtoken")
require("dotenv").config()
const userRouter = express.Router();

userRouter.post("/signup",async(req,res)=>{
    const {username,password} = req.body;
    try {

        const isUserPresent = await userModel.findOne({username})
        if(isUserPresent) return res.status(400).send("user is already signup plzz login")
        const hash = await bcrypt.hash(password,8)
        const data = await userModel({username,password:hash})
        await data.save()
        res.status(200).send({message:"new user created successfully"})
    } catch (error) {
        res.status(400).send(error.message);
    }
})

userRouter.post("/login",async(req,res)=>{
    const {username,password} = req.body
    try {

        const isUserPresent = await userModel.findOne({username})
        if(!isUserPresent) return res.status(400).send("plzz signup first")

        const isPasswordCorrect = await bcrypt.compare(password, isUserPresent.password)
        if(!isPasswordCorrect) return res.status(400).send("password is incorrect")

        const token = jwt.sign({user_id: isUserPresent._id},process.env.jwt_secret,{expiresIn:'1hr'})
        
        res.cookie ("token",token)

        res.status(200).send({msg:"login succesful",token});

    } catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports={userRouter}