const Chat= require("../Database/chat")

async function saveChatHistory(userId, message, response) {
    try{
  const resp= await Chat.create({
    userId: userId,
    message: message,
    reply: response,
    createdAt: new Date()
  });
  return resp
}
catch(error){
    console.error("Error saving chat history:", error);
    return error;
}
}

module.exports= { saveChatHistory }