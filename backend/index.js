const express = require('express');
require('dotenv').config();
const sequelize = require('./db/connection')


//setting up the variables
const PORT = process.env.PORT
const app = express();
const noteRoutes = require('./routes/note')


//use section
app.use(express.json());

//routes
app.use('/api/notes',noteRoutes)




//starting point of the server
sequelize.sync() //Database Synchronization
.then(()=>{
    app.listen(PORT, ()=>{
    console.log('Server is running on port:',PORT);
});
})
.catch((err)=>{
    console.log("Failed to sync database:",err.message)
})
