"use strict";


const router = require('express').Router()
// routes/reservation:

const reservation = require("../controllers/reservation");
const permission = require("../middelerwares/permmission")

// URL: /reservations

router.route("/").get(reservation.list).post(permission.isLogin,reservation.create);

router
  .route("/:id")
  .get(reservation.read)
  .put(permission.isAdmin,reservation.update)
  .patch(permission.isAdmin,reservation.update)
  .delete(permission.isAdmin,reservation.delete);

/* ------------------------------------------------------- */
module.exports = router;