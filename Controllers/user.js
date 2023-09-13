const e = require("express");
var mongoose=require('mongoose');
const {users}=require("../models/users");
const jwt = require('jsonwebtoken');
async function validate(req,res,next)
{ 
  // ({$and:[{email:req.body.email},{password:req.body.password}]},function(error,docs)
  users.findOne({email:req.body.email,password:req.body.password},function(error,docs)
  {
    if(docs){
      const userData = {
        // Include any user data you want to encode in the token
        userId: docs._id,
        email: docs.email,
        // Add more fields if needed
      };
      const token = jwt.sign(userData, '1234', { expiresIn: '1h' });
        // console.log(docs);
        // req.session.user = docs;
        // req.session.save();
        // res.status(200).send(docs);
        res.status(200).json({ token });
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
// async function register(req,res)  {  
//   console.log(req.body); 
//           try{
//              const first_user=new users({name:req.body.name,username:req.body.username,email:req.body.email,password:req.body.password,address:req.body.address
//           }); 
//            first_user.save();     
//            res.status(200).json({ indicator: 'success', message: ' User added successfully' });
//           }
//           catch (error) 
//           {
//            res.status(500).json(error);  
//           }
          
// }
async function register(req,res)  {  
  console.log(' testing'); 
         
          
}


module.exports={validate,register};