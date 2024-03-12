"use strict"
const nodemailer = require("nodemailer")

module.exports = function(to,subject,message){
    
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"msolmaz83@gmail.com",
            pass:"xyqc khsk esqg abcm"
        }
    })
    
    transporter.sendMail({
        //from:"msolmaz83@gmail.com",
        to:to,
        subject:subject,
        text:message 
    },(err,suc)=>{
    err ? console.log("err",err):console.log("suc",suc)
    })
    
}