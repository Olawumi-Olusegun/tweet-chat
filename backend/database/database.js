import mongoose from "mongoose";

const connectDatabase = async () => {

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || "");
        console.log("Database connected");
    } catch (error) {
        console.error(`Error connection to mongoDB: ${error?.message}`);
        process.exit(1);
    }
}

export default connectDatabase;