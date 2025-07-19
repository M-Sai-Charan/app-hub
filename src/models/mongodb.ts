import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI');

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Attach custom type to global object
declare global {
  var mongoose: MongooseCache | undefined;
}

// Use const instead of let
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'apphub',
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached; // cache it on global
  return cached.conn;
}
