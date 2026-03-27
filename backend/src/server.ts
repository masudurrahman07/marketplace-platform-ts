import 'dotenv/config';
import app from './app';
import { connectDB } from './config/db';
import User from './modules/auth/auth.model'; 

const PORT = process.env.PORT || 5000;


async function seedDemoUsers() {
  const demoUsers = [
    { name: 'Demo User', email: 'user@example.com', password: '123456', role: 'user' },
    { name: 'Demo Admin', email: 'admin@example.com', password: '123456', role: 'admin' }
  ];

  for (const u of demoUsers) {
    const exists = await User.findOne({ email: u.email });
    if (!exists) {
      await User.create(u);
      console.log(`👤 Created ${u.role} demo account: ${u.email}`);
    }
  }
}

async function startServer() {
  try {
    await connectDB();
    console.log('✅ MongoDB connected');
    
    // Run the seeder
    await seedDemoUsers();
    
  } catch (err: any) {
    console.warn('⚠️  MongoDB connection failed:', err.message);
  }

  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`🔑 Demo User: user@example.com | 123456`);
    console.log(`🔑 Demo Admin: admin@example.com | 123456\n`);
  });
}

startServer();