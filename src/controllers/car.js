"use strict"

const Car = require("../models/car")

module.exports = {

  




list:async(req,res)=>{





    const data = await res.getModelList(Car)
    res.status(200).send({
        error:false,
        details:await res.getModelListDetails(Car)
    })

},
create:async(req,res)=>{


    
    const data = await Car.create(req.body)
    res.status(201).send({
        error:false,
        data
    })

},
read:async(req,res)=>{

const data =await Car.findOne({_id:req.params.id})
res.status(200).send({
    error:false
})


},
update:async(req,res)=>{






const data = await Car.updateOne({_id:req.params.id},req.body,{runValidators:true})

res.status(200).send({
    error:false,
    data,
    new:await Cat.findOne({_id:req.params.id})
})
},
delete:async(req,res)=>{
const data = await Car.deleteOne({_id:req.params.id})



res.status(data.deletedCount ? 200 : 400).send({
    error:!data.deletedCount,
  
})
},







}