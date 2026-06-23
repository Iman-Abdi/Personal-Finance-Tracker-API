import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const env = process.env.NODE_ENV || "development";
    const mongoUri =
      env === "production"
        ? process.env.MONGO_URI_ATLAS || process.env.MONGO_URI
        : process.env.MONGO_URI_LOCAL || process.env.MONGO_URI;

    if (!mongoUri) {
      throw new Error(
        "MongoDB connection string is missing. Set MONGO_URI_LOCAL or MONGO_URI_ATLAS."
      );
    }

    const conn = await mongoose.connect(mongoUri, {
      dbName: process.env.MONGO_DB_NAME,
    });

    console.log(
      `MongoDB Connected (${env}): ${conn.connection.host}`
    );
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
