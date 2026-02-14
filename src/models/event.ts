import mongoose, { Schema, model, models } from 'mongoose';

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  date: Date,
  price: Number,
  capacity: Number,
  ticketsSold: { type: Number, default: 0 },
  image: String, // URL to the magazine-style poster
});

// Check if model exists to prevent re-compilation errors in Next.js
export const Event = models.Event || model('Event', EventSchema);