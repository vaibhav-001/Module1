const express= require("express")

const router= express.Router()

router.post("/", (req, res)=>{
let userId= req.body.userId
let message= req.body.message

//userId and message will be used to generate response from Ollama
//create a service that will generate response from Ollama using the userId and message


})

module.exports= router