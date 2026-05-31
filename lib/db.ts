import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

declare global {
  // eslint-disable-next-line no-var
  var __mongooseCache:
    | { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }
    | undefined;
}

const cached =
  global.__mongooseCache ?? (global.__mongooseCache = { conn: null, promise: null });

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.example to .env and add your MongoDB Atlas connection string."
    );
  }
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: new URL(MONGODB_URI).pathname.replace("/", "") || "paper_foundation",
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
