
const Token = require("../models/token")
const jwt = require('jsonwebtoken')
module.exports= async(req,res,next)=>{

    const auth = await req.headers?.authorization || null
    const tokenKey = auth ? auth.split(" ") : null
    if(tokenKey){
        if(tokenKey[0] == "Token"){
            const tokenData = await Token.findOne({token:tokenKey[1]}).populate("userId")
            req.user = tokenData ? tokenData.userId : undefined
        }
    }else if(tokenKey[0]== "Bearer"){
        jwt.verify(tokenKey[1],process.env.ACCESS_KEY,(err,data)=>{
            req.user = data
        })
    }
next()
}