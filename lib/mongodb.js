import mongoose from "mongoose";

const connectMongoDb = async ()=> {
    const connectionState = mongoose.connection.readyState;
    if(connectionState === 1){
        console.log("MongoDb is already connected!");
        return;
    }
    if(connectionState === 2){
        console.log("MongoDb is connecting...");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected mongodb!");
    } catch (error) {
        console.log(error.message);
        throw new Error("Error while connecting the database!", error.message);
    }
}

export default connectMongoDb;