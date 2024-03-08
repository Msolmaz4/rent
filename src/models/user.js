const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [4, "min 4 caratet"],
      trim: true,
    },
    password: {
      type: String,
      required: true,

      //mongos'da set fonksiyonu, bir belgenin belirli bir alanına değer atandığında özelleştirilmiş bir işlem gerçekleştirmek için kullanılır
      set: function (password) {
        return bcrypt.hashSync(password, 10);
      },
      //Mongoose'ta validate özelliği, belirli bir şema alanının değerini doğrulamak için kullanılır
      validate: {
        validator: function (password) {
          return password.length >= 4;
        },
        message: "min 4 carakter",
      },},
      email: {
        type: String,
        required: true,
        validate: {
          validator: function (email) {
            const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return regex.test(email);
          },
          message: "email nich genug ",
        },
      },
      firstName: {
        type: String,
        trim: true,
        
        minlength: [3, "mncarake3"],
      },
      lastname: {
        type: String,
       
      },
      isActive: {
        type: String,
        default: true,
      },
      isAdmin: {
        type: String,
        default: false,
      },
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User",UserSchema)