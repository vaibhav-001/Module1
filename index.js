const express= require("express")
const movieRoute= require("./Routes/movieRoute")
const aiRoute= require("./Routes/openAI")
const chatRoute= require("./Routes/chatRoute")
const signupRoute= require("./Routes/signup")

const app= express()

//parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.json())
//to parse url-encoded data
app.use(express.urlencoded({extended: true}))


app.use("/signup", signupRoute)
app.use("/ai", aiRoute)
app.use("/chat", chatRoute)
app.use("/movies", movieRoute)

app.get("/", (req, res)=>{
    res.send("Hello, World!")
})

app.listen(8080, ()=>{
    console.log("Server is running on port 8080")
})