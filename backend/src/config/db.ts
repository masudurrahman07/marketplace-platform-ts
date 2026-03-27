import mongoose from 'mongoose';

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) throw new Error('MONGO_URI is not defined in .env');

  if (mongoose.connection.readyState === 1) {
    console.log('✅ MongoDB already connected');
    return true;
  }

  console.log('🔗 Connecting to MongoDB Atlas...');

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4, 
    });

    console.log(`✅ MongoDB connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error: any) {
    console.error('⚠️ MongoDB connection error:', error.message);

    if (error.message.includes('authentication')) {
      console.log('💡 Auth Issue: Check your username/password in .env (no quotes!)');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.log('💡 DNS or IP Issue: Whitelist your IP in Atlas or use non-SRV URI');
    }

    throw error;
  }
};