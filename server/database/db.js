import mongoose from "mongoose";

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.DATABASE,{autoIndex:true})
        .then(()=>{
            console.log("Connected to MongoDB")
        }).catch(err=>console.log(err.message))
        
    } catch (error) {
        console.log("Failed to connect")
    }
}

export default connectDB;