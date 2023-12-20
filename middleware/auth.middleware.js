const jwt = require('jsonwebtoken');

const auth = async(req,res,next)=>{

    try {
        const {token} = req.cookies
        
        if (!token) return res.status(401).send("Please login again")

        const isTokenValid = await jwt.verify(token,process.env.jwt_secret)
        if(!isTokenValid) return res.send("Authication Faild")
        req.body.userId = isTokenValid.userId
        next()
    } catch (error) {
        res.status(400).send(error.message)
    }
}
module.exports={auth}