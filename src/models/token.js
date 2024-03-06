const mongoosoe = require("mongoose")

const TokenSchema = new mongoosoe.Schema({

    userId:{
        type:mongoosoe.Schema.ObjectId,
        ref:"User",
        required:true,
        //bu hiyli calismasini saglar ama dikkat edilmezse ram patlatir
        index:true

    },
    token:{
        type:String,
         required:true,
         index:true,
        
    }


},{
timestamps:true,
// timeseries:
// Time series, bir veri setinde zaman içindeki değişiklikleri analiz etmek ve görselleştirmek amacıyla kullanılan bir veri modelleme ve analiz yaklaşımıdır. Mongoose kütüphanesi, MongoDB ile çalışırken zaman serisi verilerini işlemek için kullanılabilir. MongoDB, belgelere dayalı bir NoSQL veritabanı olduğu için, zaman serisi verilerini depolamak ve sorgulamak için uygun bir seçenek sunar.
})
module.exports = mongoosoe.model("Token",TokenSchema)


// // Mongoose'da select fonksiyonu, bir şema alanının belirli bir işlemde (genellikle sorgu veya belge oluşturma) varsayılan olarak seçilip seçilmeyeceğini belirlemek için kullanılır. Özellikle, bu özellikle sorgulama işlemlerinde belirli alanların varsayılan olarak seçilmemesini sağlamak için kullanışlıdır.

// // Bu özellik, belirli alanları projeksiyon sorgularında kontrol etmek ve gereksiz veri transferini azaltmak amacıyla kullanılır. Varsayılan olarak, Mongoose sorgularında tüm alanlar seçilir. Ancak, belirli durumlarda, sadece belirli alanları seçmek isteyebilirsin

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Bir kullanıcı şeması oluşturalım
// const userSchema = new Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true, select: false } // Şifreyi varsayılan olarak seçme
// });

// const User = mongoose.model('User', userSchema);

// // Şifre hariç tüm alanları seçen bir sorgu
// User.findOne({ username: 'example' }).select('+password').exec((err, user) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(user);
//   }
// });
// Bu örnekte, password alanının select: false özelliği ile varsayılan olarak seçilmemesi sağlanmıştır. Ancak, bu alanı belirli bir sorguda seçmek istediğimizde, sorguya select('+password') ekleyerek belirli bir sorguda bu alanı seçebiliriz.