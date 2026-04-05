const axios = require("axios");

async function generateResponse(userId,message) {
  try {
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "gpt-oss:120b-cloud",
        prompt: message,
        stream: false
      }
    );

    console.log("Ollama response time:", response.data.created_at);

    return {
      success: true,
      response: response.data.response
    };

  } catch (error) {
    if (error.response) {
      console.error("Ollama Error Response:", error.response.data);
    } else if (error.request) {
      console.error("No response from Ollama");
    } else {
      console.error("Error:", error.message);
    }

    return {
      success: false,
      error: "AI is currently unavailable. Please try again."
    };
}
}

module.exports = { generateResponse };