require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Flower = require("./models/flowerModel");

const userRoutes = require("./routes/userRoutes");

const app = express();
let flowers = [];

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/flowers", async (req, res) => {
  const flowers = await Flower.find();
  res.status(200).json({ status: "SUCCESSFUL", flowers });
});

app.post("/api/flowers", upload.single("image"), async (req, res) => {
  const { name, description, price, category } = req.body;
  const image = req.file ? req.file.path.split("\\").join("\\") : null;
  const newFlower = new Flower({ name, description, price, category, image });
  const saveFlower = await newFlower.save();

  res.status(201).json({
    status: "SUCCESSFUL",
    saveFlower,
  });
});

app.delete("/api/flowers/:id", async (req, res) => {
  const { id } = req.params;
  await Flower.findByIdAndDelete(id);
  res.status(200).json({ status: "successful", message: "Flower deleted" });
});

app.use("/api/users", userRoutes);

const PORT = process.env.PORT_NUMBER || 3001;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`application listings on PORT: ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
