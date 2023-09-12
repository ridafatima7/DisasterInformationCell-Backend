const express=require('express');
const router=express.Router();
const authController=require('../controllers/Test');
router.post('/register',authController.register);
router.post('/login',authController.validate);
module.exports=router;