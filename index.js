const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 8003

app.use(express.json());

require("./src/config/db")

app.use(require("./src/middelerwares/authentication"))
app.use(require("./src/middelerwares/findSearch"))

app.use(require('./src/routes'))

 //require('./src/helpers/sync')()


app.listen(PORT,()=>console.log("indexteyiz"))