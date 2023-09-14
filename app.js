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
mongoose.connect(string).then((result)=>app.listen(2000))
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
// app.get('/getcar/:id', async (req, res) => {
//   try {
//     const selectedCarId = req.params.id;
//     const carData = await Cars.findOne({ Id: selectedCarId });
//     if (!carData) {
//       return res.status(404).json({ indicator: 'error', message: 'Car not found' });
//     }
//     res.status(200).json({ carData });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ indicator: 'error', message: 'Failed to fetch car data' });
//   }
// });
app.delete('/deletecar', verifyToken, async (req, res) => {
  const my_id = req.query.temp_id;
 console.log(my_id)
  try {
    const deletedCar = await Cars.findOneAndDelete({ _id: my_id });

    if (!deletedCar) {
      return res.status(404).json({ indicator: "error", message: "Car not found" });
    }

    res.status(200).json({ indicator: "success", message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ indicator: "error", message: "Failed to delete car" });
  }
});

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.get('/getcar',async (req, res)=>{
  var response= await Cars.find();
  res.send(response);
});
app.get('/getcar1',verifyToken,async (req, res)=>{
  const carId =req.query.temp_id;
  var response= await Cars.findOne({_id:carId});
  res.send(response);
});
app.get('/findcar',verifyToken, async (req, res)=>{
  try {
    const carId =req.query.temp_id;
    console.log(req.query.temp_id);
    if (!carId) {
      return res.status(400).json({ indicator: 'error', message: 'Car ID is missing in the request' });
    }

    const informationData = await Cars.findOne({ _id: carId });

    if (!informationData) {
      return res.status(404).json({ indicator: 'error', message: 'Car not found' });
    }
    res.send(informationData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ indicator: 'error', message: 'Failed to retrieve car information' });
  }
});
app.get("/updatecars", verifyToken, async (req, res) => {
  try {
    console.log(req.query.id);
    const my_id = req.query.id;
    console.log(req.query.car);
    console.log(my_id);
    const updatedCar = await Cars.findByIdAndUpdate(
     (my_id),
      {
        Car: req.query.car,
        Id: req.query.Id,
        Price: req.query.Price,
        Model: req.query.Model,
        Color: req.query.Color,
      },
      { new: true }
      );

      if (!updatedCar) {
        return res.status(404).json({ indicator: "error", message: "Car not found" });
      }
  
      res.status(200).json({ indicator: "success", message: "Car updated successfully", updatedCar });
    } catch (error) {
      console.error(error);
      res.status(500).json({ indicator: "error", message: "Failed to update car" });
    }
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