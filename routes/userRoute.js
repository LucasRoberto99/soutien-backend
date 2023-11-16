const express = require("express");
const router = express.Router();

//cryptage
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// je recup mon model
const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    console.log("route user/signup");
    // destructuring
    const { username, email, description, password } = req.body;

    // je reçois tout ?
    if (username && email && description && password) {
      // existe déjà ?
      const userEmail = await User.findOne({ email: email });
      const userUsername = await User.findOne({ username: username });

      if (userEmail) {
        return res.status(400).json({ error: "email already used" });
      }
      if (userUsername) {
        return res.status(400).json({ error: "username already used" });
      }

      const salt = uid2(16);

      const hash = SHA256(password + salt).toString(encBase64);

      // je crée le token !
      const token = uid2(16);

      const newUser = new User({
        email: email,
        username: username,
        description: description,
        salt: salt,
        hash: hash,
        token: token,
      });

      await newUser.save();

      // je ne réponds pas le password !
      return res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        description: newUser.description,
        username: newUser.username,
        token: newUser.token,
      });
    }
    return res.status(400).json({ error: "missing parameters" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
