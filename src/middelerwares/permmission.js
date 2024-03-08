module.exports={
  
    isLogin:(req,res,next)=>{
        if(req.user){
            console.log(req.user,"islogin")
            next()
        }else{
            res.send("islogin patladi")
        }
    },
    isAdmin : (req,res,next)=>{
        if(req.user && req.user?.isAdmin && req.user?.isActive){
            console.log(req.user?.isActive,"gggggggggggggggg")
            next()
        }
        else{
            res.send("admin patladi")
        }
    },
    isStaffOrisAdmin: (req, res, next) => {
        if (process.env.NODE_ENV == "dev") return next();
    
        if (req.user && (req.user.isAdmin || req.user.isStaff)) {
          next();
        } else {
          res.errorStatusCode = 403;
          throw new Error("NoPermission: You must login and to be Staff or Admin.");
        }
      },






}