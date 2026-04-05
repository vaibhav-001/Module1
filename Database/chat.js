const mongoose= require("mongoose")
const connection= require("../Database/connection")

mongoose.set("strictQuery", true)

const chatSchema= {
    userId:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    reply:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        required: true
    }

}

const schema= new mongoose.Schema(chatSchema,
    {
        strict: true
    }
)

const Chat= mongoose.model("Chat", schema)

module.exports= Chat