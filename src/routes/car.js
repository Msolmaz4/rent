const router = require("express").Router()


//burda admin ile ilgili yap hepsini 

const car = require("../controllers/car")
const { isAdmin } = require("../middelerwares/permmission")
//URL cars
//router.use(isAdmin)

router.route("/").get(car.list).post(car.create)
router.route("/:id")
  .get(car.read)
  .put(car.update)
  .patch(car.update)
  .delete(car.delete);



module.exports = router
