const User = require("../models/user");
const Token = require("../models/token");
const jwb = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    const { username, password, email } = req.body;
    console.log(username,password)
    if (username && password) {
      const user = await User.findOne({username});
      console.log(user)
      //bcrypt.compareSync(myPlaintextPassword, hash); // true
      const pass = bcrypt.compareSync(password,user.password);
      if (user && pass) {
        //token
        console.log("token olusacak")
        if (user.isActive) {
          let tokenData = await Token.findOne({ userId: user._id });
          if (!tokenData) {
            const tokenKey = bcrypt.hashSync(user._id.toString(), 10);
            tokenData = await Token.create({
              userId: user._id,
              token: tokenKey,
            });
          }

          //jwt
          const accestoken = jwb.sign({ data: user }, process.env.ACCESS_KEY, {
            expiresIn: 60 * 60 * 60,
          });

          const refreshtoken = jwb.sign(
            { id: user._id },
            process.env.REFRESH_KEY,
            { expiresIn: 60 * 60 * 60 }
          );

          res.status(200).send({
            error: false,
            token: tokenData.token,
            bearer: {
              accestoken,
              refreshtoken,
            },
            user,
          });
        } else {
          res.send("isActive false");
        }
      } else {
        res.status(404).send({
          error: true,
          message: "user oder pass fasle",
        });
      }
    } else {
      res.status(404).send({
        error: true,
        message: "usernem password achtung",
      });
    }
  },
  refresh: async (req, res) => {

    const refresh =await req.body?.bearer?.refreshtoken

    if(refresh){
        const data = jwb.verify(refresh,process.env.REFRESH_KEY)
        const { id} = data
        
           const user = await User.findOne({_id:id})
           if(user && user.isActive){
            const accestoken = jwb.sign({data:user} ,process.env.ACCESS_KEY,
                { expiresIn: "30m" })
                res.send(200).send({
                    error:"false",
                    bearer:{ accestoken}
                })

           }else{
            res.send("isactive oder user?")
           }

         
    


    }else{
        res.send("rerreh token baaammmm")
    }





  },
  logout: async (req, res) => {

    const auth = req.headers?.authorization || null; 
     const tokenKey =  auth ?  auth.split(" ") : null

     const data = await Token.deleteOne({token:tokenKey})
     res.send("baba sildik")

  },
};
