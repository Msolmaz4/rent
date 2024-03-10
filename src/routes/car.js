const router = require("express").Router()


//burda admin ile ilgili yap hepsini 

const car = require("../controllers/car")
const { isAdmin ,isLogin} = require("../middelerwares/permmission")
//URL cars
//router.use(isAdmin)

router.route("/")
.get(car.list)
.post(isAdmin,car.create)

router.route("/:id")
  .get(car.read)
  .put(isAdmin,car.update)
  .patch(isAdmin,car.update)
  .delete(isAdmin,car.delete);



module.exports = router
