import mongoose from "mongoose";
import logger from "../utils/logger";
import dotenv from 'dotenv';
dotenv.config()
export async function connectDatabase() {
 const DB_URI = <string>process.env.DB_URI;
 try {
  await mongoose.connect(DB_URI)
  logger.info("Database Connected Successfully. Great Connection!")
 } catch (error: any) {
  logger.error(error.message, 'Failed to connect to database. Good bye');
  process.exit(1);
 }
}
export async function disconnectFromDatabase() {
 await mongoose.connection.close();
 logger.info("Dosconnect from Database");
 return;
}