const express = require("express");
const signinController = require("../Controller/signinController");

const router = express.Router();

router.post("/", signinController);

module.exports= router

