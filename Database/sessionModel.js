const mongoose= require("mongoose")

//strictQuery for ignoring the fields not present in the schema.
mongoose.set("strictQuery", true)

const session_schema= {
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    sessionName:{
        type: String,
        required: true,
        default: "New Session"
    },
    createdAt:{
        type: Date,
        required: true
    }
}

const sessionSchema= new mongoose.Schema(session_schema,{
    strict: true
})

//creation of index
sessionSchema.index({UserId: 1, createdAt: -1}, {
    unique: true
})

const Session= mongoose.model(sessionSchema, "Session")

module.exports= Session