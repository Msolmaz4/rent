const mongoose = require("mongoose")

const User = require("../models/user")

module.exports={
    list:async(req,res)=>{
        console.log("losy")
        
        const data = await res.getModelList(User)

       res.status(200).send({
        errror:false,
        data,
        details : await res.getModelListDetails(User)
       })

    },
    create:async(req,res)=>{
        const data =await User.create(req.body)

    res.status(200).send({
        error:false,
        data
    })


    },
    read:async(req,res)=>{
        const data = await User.findOne({_id:req.params?.id})

        res.status(200).send({
            error:false,
            data

        })

    },
    update:async(req,res)=>{
        const data = await User.updateOne({_id:req.params?.id},req.body,{runValidators:true})

        res.status(200).send({
            error:false,
            data,
             new: await User.findOne({_id:req.params?.id})
        })

    },
    delete:async(req,res)=>{
        const data = await User.deleteOne({_id:req.params?.id})

        res.status(data.deletedCount ? 200 : 400).send({
            error:!data.deletedCount
        })

    },
}