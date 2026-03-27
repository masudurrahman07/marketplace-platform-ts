import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IItem extends Document {
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  category: string;
  location: string;
  createdBy?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ItemSchema = new Schema<IItem>({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  rating: { type: Number, default: 4.0, min: 0, max: 5 },
  category: { type: String, required: true, lowercase: true },
  location: { type: String, default: 'Global' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
}, { 
  timestamps: true, 
  
  collection: 'products' 
});


const Item: Model<IItem> = mongoose.models.Item || mongoose.model<IItem>('Item', ItemSchema);

export default Item;