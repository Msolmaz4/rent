const express = require('express')
const multer  = require('multer')
//uc tane parametre aliyor 

module.exports= multer({
    //limitleme
    limits:{
fieldSize:1024*1024*20
    },
    //filterleme
    fileFilter:(req,res,cb)=>{
        // if(!file.orginalname.match(/\.(jpg|jpeg|png)$/)){
        //     return cb(new Error ("please upload an image"))
        // }
       cb(undefined,true)//bunu kullanirsan ne gelirse yuklersin
    },
    //nereye kayfedci ve ne isminde kaydecek
    storage:multer.diskStorage({
        filename:(req,file,cb)=>{
            cb(null,file.originalname)
        },
        destination: './uploads',
    })

})