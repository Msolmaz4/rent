"use strict"

const Car = require("../models/car")
const Reservation = require("../models/reservation")
module.exports = {

  




list:async(req,res)=>{



    let filters = {}
//     if(!req.user?.Admin) filters.inPublish = true

// const { start:getStartData,end:getEndDate} = req.query

//   if(getStartData && getEndDate){
//     const reservedCards = await Reservation.find({
//         $nor:[
//             {startDate:{$gt:getEndDate}},
//             {endDate:{$lt:getStartData}}
//         ]
//     },{_id:0,cardId:1}
    
//     ).distinct("cardId")
//   }
//   if(reservedCards.length){
//     filters._id = {$nin:reservedCards}
//   }


    const data = await res.getModelList(Car,filters)
    res.status(200).send({
        data,
        error:false,
        details:await res.getModelListDetails(Car,filters)
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