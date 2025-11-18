import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Missing MONGODB_URI environment variable.');
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: ReturnType<typeof connectToDatabase> | undefined;
}

export async function connectToDatabase() {
  if (global.mongooseConnection) {
    return global.mongooseConnection;
  }

  const connection = await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000
  });

  global.mongooseConnection = connection;
  return connection;
}
