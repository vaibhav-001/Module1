const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  const token = req.headers.authorization;
  if (token) {
    let user = jwt.verify(token, process.env.JWT_SECRET);
    if (user) {
      console.log("Authenticated user:", user);
      next();
    } else {s
      res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    res.status(400).json({
      message: "Auth token is missing",
    });
  }
}

module.exports = auth;