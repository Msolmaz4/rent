const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT || 8003

app.use(express.json());
app.use(require("./src/middelerwares/findSearch"))



require("./src/config/db")
app.use(require('./src/routes'))




app.listen(PORT,()=>console.log("indexteyiz"))