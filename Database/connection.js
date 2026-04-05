const mongoose= require('mongoose');
const dotenv= require('dotenv');

dotenv.config();

console.log("Mongo URI from environment variable:", process.env.MONGO_URI);

const dbconnection= mongoose.connect(process.env.MONGO_URI)
    .then((data)=>{
        console.log("Mongo is connected succesfully with host:",data.connection.name);
    }).catch((err)=>{
        console.error("Error connecting to MongoDB:", err);
    })

    module.exports= dbconnection    
