const express = require('express');
try {
    const express = require('express');
    console.log('Express.js is installed.');
   } 
   catch (error) {
    console.error('Express.js is not installed.');
   }
const app = express();
const mongoose = require('mongoose');
const string='mongodb+srv://ridafatima:151214%40bar@cluster0.etq7ux9.mongodb.net/CrudOperations';
mongoose.connect(string).then((result)=>app.listen(5000))
.catch((error)=> console.log((error)));
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

// const port = process.env.PORT || 4000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });