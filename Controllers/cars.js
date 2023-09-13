const e = require("express");
var mongoose=require('mongoose');
const {Cars}=require("../models/cars");
const jwt = require('jsonwebtoken');
async function addCar(req,res,next){
    try{
    const first_car=new Cars({name:req.body.name,username:req.body.username,email:req.body.email,password:req.body.password,confirm_password:req.body.confirm_password,address:req.body.address }); 
    first_car.save();   
    res.status(200).json({ indicator: 'success', message: 'Car added successfully' });
   } 
   catch (error) {
   res.status(500).json({ indicator: 'error', message: 'Failed to add car' });  
   }
}
module.exports={addCar};