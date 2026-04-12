const Chat = require("../Database/chatModel");

async function searchChatHistory(userId, page, limit) {
  try {
    const chat = await Chat.find({ userId: userId })
        .skip((page - 1)*limit)
      .limit(limit);;
    return chat;
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    return error;
  }
}

//function to retrieve recent chat context(conversation) for a user to provide better responses based on recent interactions
//creating a prompt with the recent conversation history to provide better responses based on context
//conversation like prompt is generated.
async function searchChatContext(userId, message, page, limit) {
  try {
    let prompt= ""
    const chat = await Chat.find(
      { userId: userId },
      {
        message: 1,
        reply: 1,
        _id: 0,
      },
    )
      .sort({ createdAt: 1 })
      .skip((page - 1)*limit)
      .limit(limit);

      try{
        let validationData= await validateChatHIstory(userId)
        if(validationData && validationData.length>0 &&validationData.isConversationExist===true){
            console.log(validationData.message)           
             prompt = "Analyze this conversation between user and assistant and provide answers based on most recent interaction. You are a helpful assistant. Always answer based on the MOST RECENT context.If unclear, ask for clarification.\n";
            chat.forEach((convo) => {
            prompt += `User: ${convo.message}. \n`;
            prompt += `Assistant: ${convo.reply}. \n`;
    });
            }
        
      }catch(error){
        throw new Error("Error validating chat history:", error)
      }
    
    prompt += `User: ${message}. \n`;
    console.log("Generated prompt for context:", prompt);

    return prompt;
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    return error;
  }
}

async function validateChatHIstory(userId) {
  try {
    const chat = await Chat.find({ userId: userId });
    if(chat && chat.length===0){
        return {
            "length": 0,
            "message": `No chat history found for the user ${userId}`,
            isConversationExist: false
        }
    }
    else{
        return {
            "length": chat.length,
            "message": `Chat history found for the user ${userId}`,
            isConversationExist: true
        }
    }

  } catch (error) {
    console.error("Error validating chat history:", error);
  }
}

module.exports = { searchChatHistory, searchChatContext };
