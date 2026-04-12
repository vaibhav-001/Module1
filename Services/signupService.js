const User = require("../Database/userModel");
const validator= require("validator")
const bcrypt= require("bcrypt")

async function validateInput(name, email, password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  if (!name || !email || !password) {
    return { valid: false, message: "All fields are required." };
  } else if (!validator.isEmail(email)) {
    return { valid: false, message: "Invalid email format." };
  } else if (!passwordRegex.test(password)) {
    return {
      valid: false,
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
    };
  } else {
    return {
      valid: true,
      message: "Input is valid.",
    };
  }
}

async function findUserByEmail(email) {
  try {
    let user = await User.findOne(
      {
        email: email,
      },
      {
        email: 1,
        _id: -0,
      },
    );

    if (user) {
      return {
        isUserExist: true,
      };
    } else {
      return {
        isUserExist: false,
      };
    }
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Error finding user by email:", error);
  }
}

async function createUser(name, email, password){
    try{
        const hashedPassword = await passwordHash(password, 10);
        const user = await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            createdAt: new Date()
        })
        return user
    }catch(error){
        console.error("Error creating user:", error)
        throw new Error("Error creating user:", error)
    }
}

async function passwordHash(password, saltRounds){

    try{
        const hashedPaaword= await bcrypt.hash(password, saltRounds)
        console.log("Hashed password:", hashedPaaword)
        return hashedPaaword
    }catch(error){
        console.error("Error hashing password:", error)
        throw new Error("Error hashing password:", error)
    }
}

module.exports= {findUserByEmail,validateInput, createUser}