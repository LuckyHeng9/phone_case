// // authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // console.log("Authorization Header:", authHeader);  // Log incoming headers
  // console.log("Token:", token);  // Log the extracted token

  if (!token) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user; 
    next();
  });
};
