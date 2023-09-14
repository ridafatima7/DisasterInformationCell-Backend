const express = require('express');
try {
    const express = require('express');
    console.log('Express.js is installed.');
   } 
   catch (error) {
    console.error('Express.js is not installed.');
   }
   
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const TestRouter=require('./Routes/users_routes')
// const CarRouter=require('./Routes/cars');
const string='mongodb+srv://ridafatima:151214%40bar@cluster0.etq7ux9.mongodb.net/CrudOperations';
mongoose.connect(string).then((result)=>app.listen(5000))
.catch((error)=> console.log((error)));
app.use(cors());
const userSchema=new mongoose.Schema({
  name:{
      type:String,
      required:true,
  },
  username:{
      type:String,
      required:true,
  },
  email:{
      type:String,
      required:true,
  },
  password:{
      type:String,
      required:true,
  }, 
  address:{
      type:String,
      // required:true,
  }
});

const users=mongoose.model("users",userSchema);
const {Cars}=require("./models/cars");

app.post('/register',(req, res)=>{
  console.log(req.body.name);
  try{
       const first_user=new users({name:req.body.name,username:req.body.username,email:req.body.email,password:req.body.password,address:req.body.address
      }); 
      first_user.save();     
      res.status(200).json({ indicator: 'success', message: ' User added successfully' });
      }
      catch (error) 
      {
      res.status(500).json(error);  
      }
});
// app.use('/Test',TestRouter);
// app.use('/Cars',CarRouter);
app.get('/login', async (req, res) => {
  try {
    console.log(req.query.email);
    console.log(req.query.password);

    const docs = await users.findOne({ email: req.query.email, password: req.query.password });
    console.log(docs);
    if (docs) {
      const userData = {
        // userId: docs._id,
        email: docs.email,
      };
      console.log(userData);
      const token = jwt.sign(userData, '1234', { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      const emailDocs = await users.findOne({ email: req.query.email });

      if (emailDocs) {
        res.status(200).send('Password is incorrect');
      } else {
        res.status(200).send('Email not found');
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if(token)
  {
    const token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ indicator: 'error', message: 'Unauthorized: Token missing' });
  }
  
  next(); 
}
app.get('/addcar', verifyToken,(req, res,next)=>{
  try{
    
    const first_car=new Cars({Car:req.query.car,Id:req.query.Id,Price:req.query.Price,Model:req.query.model,Color:req.query.color}); 
    first_car.save();   
    res.status(200).json({ indicator: 'success', message: 'Car added successfully' });
   } 
   catch (error) {
   res.status(500).json({ indicator: 'error', message: 'Failed to add car' });  
   }
});
app.get('/getcarids', async (req, res) => {
  try {
    const carIds = await Cars.find().distinct('Id');
    res.status(200).json({ carIds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ indicator: 'error', message: 'Failed to fetch car IDs' });
  }
});
app.get('/getcar/:id', async (req, res) => {
  try {
    const selectedCarId = req.params.id;
    const carData = await Cars.findOne({ Id: selectedCarId });
    if (!carData) {
      return res.status(404).json({ indicator: 'error', message: 'Car not found' });
    }
    res.status(200).json({ carData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ indicator: 'error', message: 'Failed to fetch car data' });
  }
});
app.delete('/deletecar/:id', async (req, res) => {
  try {
    const carId = req.params.id;
    const deletedCar = await Cars.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({ indicator: 'error', message: 'Car not found' });
    }
    res.status(200).json({ indicator: 'success', message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ indicator: 'error', message: 'Failed to delete car' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.get('/getcar',async (req, res)=>{
  var response= await Cars.find();
  res.send(response);
});
app.get("/updatecars", async (req, res) => {
  const my_id = req.query.id
  const car = await Cars.findOneAndUpdate({breed: my_id}, {age: 23}, {new:true});
  res.send(car);
  
});
   app.get("/deletecars", async (req, res) => {
   const my_id = req.query.id
   Cars.findOneAndDelete({breed: my_id},function (err, docs) {
   res.send(docs);
});
});
app.get('/Test', (req, res,next) => {

  try {
    const first_user = new users({
      name: req.query.name,
      username: req.query.username,
      email: req.query.email,
      password: req.query.password,
      address: req.query.address
    });
     first_user.save();
    res.status(200).json({ indicator: 'success', message: 'User added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ indicator: 'error', message: 'Failed to add user' });
  }
  // res.send('Hello, Express!');
});
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });