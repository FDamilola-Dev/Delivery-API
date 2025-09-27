const mongoose = require("mongoose");

const flowerSchema = new mongoose.Schema({
  name: 'Rose',
  description: 'Blush red',
  price: 3,
  category: 'Romance',
});

const flower = mongoose.model("Flower", flowerSchema);

module.exports = flower;

