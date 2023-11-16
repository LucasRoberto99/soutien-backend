require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

//import de mes routes !!!!!
const userRoute = require("./routes/userRoute");

//utilisation de mes routes !!!!
app.use(userRoute);

app.get("/", (req, res) => {
  console.log("ma route /");
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "page not found" });
});

app.listen(process.env.PORT, () => {
  console.log("server started :)");
});
