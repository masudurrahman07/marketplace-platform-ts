import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  itemId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  totalPrice: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', BookingSchema);
