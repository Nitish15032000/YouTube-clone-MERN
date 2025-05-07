import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    if (error.message.includes("SSL")) {
      console.error("Check your MongoDB connection string and TLS settings.");
    }
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;