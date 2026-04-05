const { saveChatHistory } = require("../Services/saveChatService");
const { generateResponse } = require("../Services/ollamaService");

async function chatController(req, res) {
  let userId = req.body.userId;
  let message = req.body.message;
  try {
    const data = await generateResponse(userId, message);
    try {
      const save = await saveChatHistory(userId, message, data.response);
      console.log("Chat history saved:", save);
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
    if (data && data.success === true) {
      res.json({ response: data.response });
    }
  } catch (error) {
    console.error("Error in chat route:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
}

module.exports = { chatController };
