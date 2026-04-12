const express= require("express")
const movieRoute= require("./Routes/movieRoute")
const aiRoute= require("./Routes/openAI")
const chatRoute= require("./Routes/chatRoute")
const signupRoute= require("./Routes/signupRoute")
const signinRoute= require("./Routes/signinRoute")
const auth= require("./Services/authService")

const app= express()

//parse incoming request bodies in  middleware before your handlers, available under the req.body property.
app.use(express.json())
//to parse url-encoded data
app.use(express.urlencoded({extended: true}))


app.use("/signup", signupRoute)
app.use("/signin", signinRoute)
app.use("/ai", auth, aiRoute)
app.use("/chat",auth, chatRoute)
app.use("/movies", auth, movieRoute)

app.get("/", (req, res)=>{
    res.send("Hello, World!")
})

app.listen(8080, ()=>{
    console.log("Server is running on port 8080")
})