const express = require('express');
require('dotenv').config();


//setting up the variables
const PORT = process.env.PORT
const app = express();


//use section
app.use(express.json());




//starting point of the server
app.listen(PORT, ()=>{
    console.log('Server is running on port:',PORT);
});