import mongoose from "mongoose";

export function dbConnection(){
    const params = {
        useNewUrlparser:true,
        useUnifiedTopology:true,
    };
    try {
        mongoose.connect(process.env.MONGO_URL,params)
        console.log("Mongo DB connected successfully")
    } catch (error) {
        console.log("Connection error : ",error)
    }
}