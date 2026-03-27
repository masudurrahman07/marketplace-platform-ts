import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  itemId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model<IReview>('Review', ReviewSchema);
