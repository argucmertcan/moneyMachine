import mongoose, { type Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable.');
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: { conn: Mongoose | null; promise: Promise<Mongoose> | null } | undefined;
}

const cached = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<Mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
