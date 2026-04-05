const express= require("express")
const movieRoute= require("./Routes/movieRoute")
const aiRoute= require("./Routes/openAI")
const chatRoute= require("./Routes/chatRoute")

const app= express()

app.use(express.json())

app.use("/movies", movieRoute)
app.use("/ai", aiRoute)
app.use("/chat", chatRoute)

app.get("/", (req, res)=>{
    res.send("Hello, World!")
})

app.listen(8080, ()=>{
    console.log("Server is running on port 8080")
})