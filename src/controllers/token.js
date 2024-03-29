const mongoose = require("mongoose")

const Token = require("../models/token")

module.exports={
    list:async(req,res)=>{
        console.log("token")
        
        const data = await res.getModelList(Token)

       res.status(200).send({
        errror:false,
        data,
        details : await res.getModelListDetails(Token)
       })

    },
    create:async(req,res)=>{
        const data =await Token.create(req.body)

    res.status(200).send({
        error:false,
        data
    })


    },
    read:async(req,res)=>{
        const data = await Token.findOne({_id:req.params?.id})

        res.status(200).send({
            error:false,
            data

        })

    },
    update:async(req,res)=>{
        const data = await Token.updateOne({_id:req.params?.id},req.body,{runValidators:true})

        res.status(200).send({
            error:false,
            data,
             new: await Token.findOne({_id:req.params?.id})
        })

    },
    delete:async(req,res)=>{
        const data = await Token.deleteOne({_id:req.params?.id})

        res.status(data.deletedCount ? 200 : 400).send({
            error:!data.deletedCount
        })

    },
}