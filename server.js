require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');


const app = express();


app.get("/" , (req, res) => {
res.json({name : 'Fatimah'})
})

const PORT = process.env.PORT_NUMBER || 3000;




// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {console.log('Connected to MongoDB Atlas')
    app.listen(PORT, () => {
    console.log(`application listings on PORT: ${PORT}`)
} )
  } )
  .catch((err) => console.error('MongoDB connection error:', err));