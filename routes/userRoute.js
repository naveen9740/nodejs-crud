const express = require("express");
const cryptoJS = require("crypto-js");
const { verifyToken } = require("../middlewares/verifyToken");
const router = express.Router();
const userSchema = require("../models/user-schema");
const cryptoJs = require("crypto-js");

//get all users
router.get("/users", async (req, res) => {
  try {
    const users = await userSchema.find();
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//get single user
router
  .route("/user/:id")
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userSchema.findById(id);
      res.json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  })
  // update a user
  .put(verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      if (req.body.password) {
        req.body.password = cryptoJs.AES.encrypt(
          req.body.password,
          "mySecretKey"
        ).toString();
      }
      const updatedUser = await userSchema.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.json({ success: true, updatedUser });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  })
  //del user
  .delete(verifyToken, async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userSchema.findByIdAndDelete(id);
      res.json({
        success: true,
        message: `user has been deleted`,
        user,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

module.exports = router;
