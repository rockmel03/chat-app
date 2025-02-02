import mongoose from "mongoose";

export default async function connectDB() {
  try {
    const response = await mongoose.connect(
      `${process.env.MONGODB_URI}/chat-app`
    );
    console.log(`connected to database, host: ${response.connection.host}`);
  } catch (error) {
    console.error("Failed to connect Database :", error);
    throw error;
  }
}
