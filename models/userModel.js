const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true , "Name required"]
    },
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"],
  },
     password: {
        type: String,
        required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false, 
    
  },
   cartData: {
        type: Object,
        default: {}
    }
}, {minimize: false});

// static signup method
userSchema.statics.signup = async function (email, password) {
  // Check if user already exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  // Validate email
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }

  // Validate password strength (optional)
  if (password.length < 6) {
    throw Error("Password must be at least 6 characters long");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // Create user
  const user = await this.create({ email, password: hash });

  return user;
};



userSchema.methods.correctPassword = async function (enteredPassword, savedPassword) {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
    