const mongoose = require("mongoose")

const db = ()=>{
    mongoose.connect(process.env.MONGOSSE)
    .then(()=>console.log("mongose okey"))
    .catch((err)=>console.log("mongose error"))
}
db()
module.exports = db