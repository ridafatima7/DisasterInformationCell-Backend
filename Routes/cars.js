const express=require('express');
const router=express.Router();
const CarController=require('../Controllers/cars');
router.post('/addcar',CarController.addCar);
// router.post('/login',CarController.validate);
module.exports=router;