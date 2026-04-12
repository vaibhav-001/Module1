const User = require("../Database/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function signinController (req, res){
  const email = req.body.email;
  const password = req.body.password;

  console.log("Received signin request with email:", email);
  if (validator.isEmail(email)) {
    try {
      let user = await User.findOne(
        { email: email },
        {
          email: 1,
          password: 1,
          _id: 0,
        },
      );
      console.log("Retrieved user login details:", user);
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match result:", isMatch);
        if (isMatch) {
          //token generate
          let payload = {
            email: user.email,
            id: user._id,
          };

          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          res.status(200).json({
            success: true,
            token: token,
            message: "Login successfull",
          });
        } else {
          res.status(400).json({ message: "Invalid email or password" });
        }
      }
    } catch (error) {
      console.error("Error finding user by email:", error);
      res.status(500).json({ message: "Error finding user by email" });
    }
  }
}

module.exports= signinController;