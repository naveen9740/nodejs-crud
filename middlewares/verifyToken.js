const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader;
    jwt.verify(token, "mySecretKey", (err) => {
      if (err) {
        res.status(403).json({ success: false, error: "Token Not Valid" });
      }
    });
    next();
  } else {
    return res
      .status(401)
      .json({ success: false, error: "You are Not Authenticated" });
  }
};

module.exports = { verifyToken };
