import mongoose from "mongoose";
import dotenv from "dotenv";

const DbConnect = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB Connected: ${response.connection.host}`);
    
  } catch (error) {
    console.error("MongoDb Connection Error", error);
    process.exit(1);
  }
};

export default DbConnect;
