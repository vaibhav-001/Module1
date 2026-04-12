const mongoose= require("mongoose")
const connection= require("./connection")

mongoose.set("strictQuery", true)

const userSchema= {
    name:{
        type: String,
        lowercase: true,
        required: true
    },
    email:{
        type: String,
        required: true,
        unqiue: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    createdAt:{
        type: Date,
        required: true
    }
}

const user= new mongoose.Schema(userSchema,{
    strict: true
} )

//index is created on email field
user.index({ email: 1 }, { unique: true });

const User= mongoose.model("User", user)

module.exports= User