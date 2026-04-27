const express = require('express');
require('dotenv').config();
const sequelize = require('./db/connection')


//setting up the variables
const PORT = process.env.PORT
const app = express();
const noteRoutes = require('./routes/note')
const userRoutes = require('./routes/user');


//use section
app.use(express.json());

//routes
app.use('/api/notes',noteRoutes);
app.use('/user',userRoutes);




//starting point of the server
sequelize.sync({ force: true }) //Database Synchronization
.then(()=>{
    app.listen(PORT, ()=>{
    console.log('Server is running on port:',PORT);
});
})
.catch((err)=>{
    console.log("Failed to sync database:",err.message)
})
