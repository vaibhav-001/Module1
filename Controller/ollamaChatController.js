const { saveChatHistory } = require("../Services/saveChatService");
const { generateResponse } = require("../Services/ollamaService");
const {
  searchChatHistory,
  searchChatContext,
} = require("../Services/searchChatHistory");

//creates a chat propmpt with recent conversation history and user message to provide better responses based on context and saves the chat history in the database
//generate reponse from Ollama service and sends the response back to the user
//stores the latest conversation context in the database for future interactions to provide better responses based on context
async function chatController(req, res) {
  let userId = req.body.userId;
  let message = req.body.message.toLowerCase();
  let page = req.query.page;
  let limit = req.query.limit;

  console.log(
    "Received chat request with userId:",
    userId,
    "message:",
    message,
    "page:",
    page,
    "limit:",
    limit,
  );
  try {
    const latest_prompt = await searchChatContext(userId, message, page, limit);
    const data = await generateResponse(userId, latest_prompt);
    try {
      const save = await saveChatHistory(userId, message, data.response);
      console.log("Chat history saved:", save);
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
    if (data && data.success === true) {
      res.json({ 
        success: true,
        page: page,
        response: data.response });
    }
  } catch (error) {
    console.error("Error in chat route:", error);
    return res
      .status(500)
      .json({ 
        success: false,
        error: "An error occurred while processing your request." });
  }
}

async function searchChatHistoryController(req, res) {
  const userId = req.params.userId;
  let page= req.query.page || 1;
  let limit= req.query.limit || 5
  console.log("Received request for chat history with userId:", userId);
  try {
    let history = await searchChatHistory(userId, page, limit );

    if (history && history.length === 0) {
      res.json({
        success: true,
        page: page,
        message: `No chat history found for the user ${userId}`,
      });
    } else {
      res.json({ 
        success: true,
        page: page,
        history: history
      });
    }
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving chat history." });
  }
}

module.exports = { chatController, searchChatHistoryController };
