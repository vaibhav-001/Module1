const express = require("express");
const {signupController}= require("../Controller/signupController")

const router = express.Router();

router.post("/", signupController);


module.exports= router

