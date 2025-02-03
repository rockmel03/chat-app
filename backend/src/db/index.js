import mongoose from "mongoose";
import { DABASE_NAME } from "../constants.js";

export default async function connectDB() {
  try {
    const response = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DABASE_NAME}`
    );
    console.log(`connected to database, host: ${response.connection.host}`);
  } catch (error) {
    console.error("Failed to connect Database :", error);
    throw error;
  }
}
