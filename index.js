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
app.use("/images",express.static("./uploads"))
// Bu kod, http://example.com/images URL'sine yapılan istekleri, sunucunun ./uploads dizinindeki dosyalara yönlendirir. Yani, istemci tarafından /images yoluna yapılan bir HTTP GET isteği, sunucu tarafından ./uploads dizinindeki dosyalara çözümlenir.

// Bu genellikle resim dosyaları, stil dosyaları veya istemci tarafından talep edilen diğer statik içerikleri sunucunun dışında bir klasörde depolamak için kullanılır. Bu, sunucunun daha hafif olmasına ve talep edilen dosyaların doğrudan sunucu tarafından sağlanmasına olanak tanır, böylece her istek için dinamik içerik üretme ihtiyacı ortadan kalkar

app.listen(PORT,()=>console.log("indexteyiz"))