const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost/projet-soutien5");

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

app.listen(3000, () => {
  console.log("server started :)");
});
