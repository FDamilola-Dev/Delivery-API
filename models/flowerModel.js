const mongoose = require("mongoose");

const flowerSchema = new mongoose.Schema({
  name: {type: String},
  description:{type: String},
  price: {type: Number},
  category: {type: String},
  image : {type: String}
});

const flower = mongoose.model("Flower", flowerSchema);

module.exports = flower;

