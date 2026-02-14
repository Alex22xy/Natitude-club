import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

export const connectDB = async () => {
  // If we are already connected, don't do it again
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGODB_URI);
};