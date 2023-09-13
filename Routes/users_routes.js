const express=require('express');
const router=express.Router();
const userController=require('../Controllers/user');
router.post('/register',userController.register);
router.post('/login',userController.validate);
module.exports=router;