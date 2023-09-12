const e = require("express");
var mongoose=require('mongoose');
const {users}=require("../models/users");
async function validate(req,res,next)
{ 
  // ({$and:[{email:req.body.email},{password:req.body.password}]},function(error,docs)
  users.findOne({email:req.body.email,password:req.body.password},function(error,docs)
  {
    if(docs){
        console.log(docs);
        req.session.user = docs;
        req.session.save();
        res.status(200).send(docs);
   }
    else
    {
        users.findOne({ email: req.body.email }, function (error, emailDocs) {
        if (emailDocs) 
        {
          res.status(200).send('Password is incorrect');
        }
        else 
        {
          res.status(200).send('Email not found');
        }
      });
    }
   });
}
async function register(req,res,next){
  
    users.findOne({email:req.body.email},function(error,docs)
    {
     if(docs)
     {
      res.send('Already have an account')
     }
     else
     {
        users.findOne({username:req.body.username},function(error1,docs1)
      {
        if(docs1)
        {
          res.send('Username already exists!')
        }
        else
        {
          const first_user=new users({name:req.body.name,username:req.body.username,email:req.body.email,password:req.body.password,confirm_password:req.body.confirm_password,address:req.body.address
           }); 
           first_user.save();     
        }
      })
    }
});
}

module.exports={validate,register};