const express = require("express");
const userSchema = require("../models/user-schema");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("../middlewares/verifyToken");
const cryptoJS = require("crypto-js");
const router = express.Router();
userSchema;

//Register
router.post("/register", verifyToken, async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await userSchema.create({
      username,
      email,
      password: cryptoJS.AES.encrypt(password, "mySecretKey").toString(),
    });

    await newUser.save();
    res.status(201).json({
      sucess: true,
      messge: `${username} account created`,
      newUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userSchema.findOne({ username });

    !user &&
      res.status(401).json({ success: false, message: "User Not Found" });

    const hashedPassword = cryptoJS.AES.decrypt(user.password, "mySecretKey");

    const originalPassword = hashedPassword.toString(cryptoJS.enc.Utf8);

    if (originalPassword !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Password Incorrect" });
    }

    const token = jwt.sign({ id: user._id }, "mySecretKey", {
      expiresIn: "1d",
    });

    res.json({ success: true, message: "Logged In success", token });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
