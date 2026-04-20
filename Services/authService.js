const jwt = require("jsonwebtoken");
const dotenv= require("dotenv")

dotenv.config()

//this function will handle JWT token coming form frontend and authenticate users.
async function auth(req, res, next) {
  const token = req.headers.authorization;
  const authToken= token.split(" ")[1].trim()
  //console.log("Received auth token:", token);
  if (token) {
    let user = jwt.verify(authToken, process.env.JWT_SECRET);
    if (user) {
      console.log("Authenticated user:", user);
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(400).json({
      message: "Auth token is missing",
    });
  }
}

module.exports = auth;