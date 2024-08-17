import mongoose from "mongoose";

const connectMongoDb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected mongodb!");
    } catch (error) {
        console.log(error.message);
    }
}

export default connectMongoDb;