import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_CONN_STRING;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URL missing in .env");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function dbConnection() {
  console.log("Fetching data from DB");
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = await mongoose
      .connect(process.env.MONGO_CONN_STRING, { bufferCommands: false })
      .then((mongoose) => {
        return mongoose;
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}
