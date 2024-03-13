"use strict";

const Car = require("../models/car");
const Reservation = require("../models/reservation");
module.exports = {
  list: async (req, res) => {
    let filters = {};
    if (!req.user?.isAdmin) filters.isPublish = true;

    // const { start:getStartData,end:getEndDate} = req.query

    // if (getStartDate && getEndDate) {

    //     const reservedCars = await Reservation.find({
    //         $nor: [
    //             { startDate: { $gt: getEndDate } },
    //             { endDate: { $lt: getStartDate } }
    //         ]
    //     }, { _id: 0, carId: 1 }).distinct('carId')
    //     /*
    //     distinct() convert from:
    //     [
    //         { carId: new ObjectId("65352f518a9ea121b1ca5001") },
    //         { carId: new ObjectId("65352f518a9ea121b1ca5002") }
    //     ]
    //     to:
    //     [
    //         new ObjectId("65352f518a9ea121b1ca5001"),
    //         new ObjectId("65352f518a9ea121b1ca5002")
    //     ]
    //     */
    //     if (reservedCars.length) {
    //         filters._id = { $nin: reservedCars }
    //     }
    //     // console.log(filters)
    // }
   
   
    const data = await res.getModelList(Car, filters, "images");
    res.status(200).send({
      data,
      error: false,
      details: await res.getModelListDetails(Car),
    });
  },
  create: async (req, res) => {
    //req.body.images = req.file.originalname
    //req.body.images = req.file.originalname burda dikaktedilecek olay uplaos arratu vet asingle olmasi

    console.log(req.files, "resim");
    const plk = await Car.findOne({ plateNumber: req.body?.plateNumber });
    //console.log(plk,"plateNumber")
    if (!plk) {
      req.body.images = req.file.originalname;
      const data = await Car.create(req.body);
      res.status(201).send({
        error: false,
        data,
      });
    } else {
      res.status(201).send({
        error: false,
        message: "leider iesePlakat ist verfugbar",
      });
    }
  },
  read: async (req, res) => {
    const data = await Car.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
    });
  },
  update: async (req, res) => {
    req.body.images = req.files.originalname;

    const data = await Car.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(200).send({
      error: false,
      data,
      new: await Car.findOne({ _id: req.params?.id }),
    });
  },
  delete: async (req, res) => {
    const data = await Car.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 200 : 400).send({
      error: !data.deletedCount,
    });
  },
};
