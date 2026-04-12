const validator = require("validator");
const Chat = require("../Database/chatModel");
const {validateInput,findUserByEmail, createUser}= require("../Services/signupService")

async function signupController(req, res) {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  let isValid = await validateInput(name, email, password);
  if (!isValid.valid) {
    res.status(400).json({ error: isValid.message });
  } else {
    try {
      let user = await findUserByEmail(email);
      if (user && user.isUserExist === true) {
        res.status(400).json({ error: "User with this email already exists." });
      } else {
        //create user
        let user = await createUser(name, email, password);
        console.log("User created successfully:", user);
        res.status(200).json({ message: "User created successfully." });
      }
    } catch (error) {
      res.status(500).json({ error: "Error checking user existence." });
    }
  }
}

module.exports = { signupController };
