

const User = require("../models/user");
const email = require("../helpers/email")
module.exports = {
  list: async (req, res) => {
    console.log("losy");

    const data = await res.getModelList(User);

    res.status(200).send({
      errror: false,
      data,
      details: await res.getModelListDetails(User),
    });
  },
  create: async (req, res) => {
    const data = await User.create(req.body);
 // email(req.body.email,"creat",req.body)
  email(req.body.email,"creat",JSON.stringify(req.body))


    res.status(200).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    const id = req.user?.isAdmin ? req.params?.id : req.user?.id;
    console.log(req.user?.id ,"kobntolid")
    console.log(id,"read")
    //         let filters = {}
    // if(!req.user?.isAdmin){
    //     filters = {_id:req.params.id}

    // }

    //const data = await User.findOne({...filters,_id:id})
    const data = await User.findOne({ _id:id });

    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
  if(!req.user?.isAdmin) req.params.id = req.user?._id
  let dat
  if(!req.user?.isAdmin){
   dat ={...req.body,isAdmin:false}
   console.log(dat,"dattttttttttttttttttt")
  }
  else{
    dat=req.body
  }
 
    const data = await User.updateOne({ _id: req.params?.id }, dat, {
      runValidators: true,
    });

    res.status(200).send({
      error: false,
      data,
      new: await User.findOne({ _id: req.params?.id }),
    });
  },
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params?.id });

    res.status(data.deletedCount ? 200 : 400).send({
      error: !data.deletedCount,
    });
  },
};
