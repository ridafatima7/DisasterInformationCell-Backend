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
const mongoose = require('mongoose');
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

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.post('/Test', (req, res) => {
  console.log(req.body.name);
  const first_user=new users({name:req.body.name,username:req.body.username,email:req.body.email,password:req.body.password,address:req.body.address
     }); 
    first_user.save();   
    res.status(200).json({ indicator: 'success', message: ' User added successfully' }); 
  // res.send('Hello, Express!');
});
// app.use(function(req, res, next) {
//   next(createError(404));
// });
// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });