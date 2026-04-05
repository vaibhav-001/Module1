const openai= require('openai')
const dotenv= require('dotenv')

dotenv.config()

const client= new openai.OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

async function generateResponse(){
   const response= await client.responses.create({
            model: 'gpt-3.5-turbo',
            input: "Hello, how are you?"
        })

    console.log("This is the response from OpenAI: ", response)
}

module.exports= {generateResponse}