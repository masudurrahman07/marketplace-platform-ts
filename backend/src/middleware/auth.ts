import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as admin from 'firebase-admin';
import User from '../modules/auth/auth.model'; 

export interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized: No token provided' });
  }

  try {
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      req.user = { id: decoded.id, role: decoded.role || 'user' };
      return next(); 
    } catch (jwtErr) {
      
    }

    
    try {
      const firebaseUser = await admin.auth().verifyIdToken(token);
      
      
      
      let user = await User.findOne({ email: firebaseUser.email });

      
      if (!user) {
        user = await User.create({
          name: firebaseUser.name || 'Google User',
          email: firebaseUser.email,
          password: Math.random().toString(36).slice(-8), 
          role: 'user'
        });
        console.log(`✨ Created new MongoDB user for Google login: ${user.email}`);
      }
      
      req.user = { 
        id: (user._id as any).toString(), 
        role: user.role 
      };
      
      return next();
    } catch (firebaseErr) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }

  } catch (error) {
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ success: false, message: 'Admin access required' });
  }
  next();
};