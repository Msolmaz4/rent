const router = require("express").Router()


//burda admin ile ilgili yap hepsini 

const car = require("../controllers/car")
const { isAdmin } = require("../middelerwares/permssion")
//URL cars
router.use(isAdmin)

router.route("/")
