const express= require("express")
const { chatController }= require("../Controller/ollamaChatController")

const router= express.Router()

router.post("/", chatController)

module.exports= router