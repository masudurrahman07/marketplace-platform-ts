import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as admin from 'firebase-admin'; 
import path from 'path'; 
import authRoutes from './modules/auth/auth.routes';
import itemRoutes from './modules/items/item.routes';
import reviewRoutes from './modules/reviews/review.routes';
import bookingRoutes from './modules/bookings/booking.routes';
import userRoutes from './modules/users/user.routes';
import dashboardRoutes from './modules/dashboard/dashboard.routes';
import aiRoutes from './modules/ai/ai.routes';

const app = express();
const firebaseServiceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (firebaseServiceAccount) {
  const serviceAccount = JSON.parse(firebaseServiceAccount);
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log('✅ Firebase Admin Initialized');
  }
} else {
  console.warn('⚠️ FIREBASE_SERVICE_ACCOUNT not found in env');
}
app.use(cors({ 
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'https://marketplace-platform-ts.vercel.app'  
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiRoutes);


app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'marketplace-api',
    port: process.env.PORT || 5000 
  });
});


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Global Error]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

export default app;