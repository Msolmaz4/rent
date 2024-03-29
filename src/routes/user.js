const router = require("express").Router()

const user = require("../controllers/user")
const permission = require("../middelerwares/permmission")

router.route("/")
.get(permission.isLogin,permission.isAdmin,user.list)
.post(user.create)

router.route("/:id")
.get(permission.isLogin,user.read)
.put(permission.isLogin,user.update)
.patch(permission.isLogin,user.update)
.delete(permission.isAdmin,user.delete)

module.exports = router