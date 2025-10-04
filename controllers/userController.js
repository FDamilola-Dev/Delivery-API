const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.registerUser = async (req, res) => {
  try {
    console.log( "error")

    const { name, email, password } = req.body;

    // const newUser = await User.create({ name, email, password });
        const newUser = await User.signup(email, password, name);

    // const token = createToken(newUser._id);

    res.status(200).json({
      status: "SUCCESS",
      // token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    res.status(400).json({ status: "FAIL", error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Check email & password provide
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    
    const token = createToken(user._id);

    res.status(200).json({
      status: "SUCCESS",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(400).json({ status: "FAIL", message: error.message });
  }
};
