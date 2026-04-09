const express= require("express")
const { chatController, searchChatHistoryController}= require("../Controller/ollamaChatController")

const router= express.Router()

router.post("/", chatController)
router.get("/history/:userId", searchChatHistoryController)

module.exports= router