import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from './auth.model'; 

const router = Router();

const signToken = (id: string, role: string) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '7d' });


router.post('/google', async (req: Request, res: Response) => {
  try {
    const { name, email, photoURL } = req.body; 
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      user = await User.create({
        name: name || 'Google User',
        email: normalizedEmail,
        photoURL, 
        password: Math.random().toString(36).slice(-10), 
        role: 'user'
      });
    } else if (photoURL && !user.photoURL) {
      
      user.photoURL = photoURL;
      await user.save();
    }

    const token = signToken(user._id.toString(), user.role);

    res.status(200).json({
      success: true,
      token,
      user: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        photoURL: user.photoURL 
      }
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ success: false, message: 'All fields required' });

    const normalizedEmail = email.toLowerCase().trim();
    const exists = await User.findOne({ email: normalizedEmail });
    if (exists) return res.status(400).json({ success: false, message: 'Email already registered' });

    const user = await User.create({ name, email: normalizedEmail, password });
    const token = signToken(user._id.toString(), user.role);

    res.status(201).json({ 
      success: true, 
      token, 
      user: { _id: user._id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Email and password required' });

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = signToken(user._id.toString(), user.role);
    
    res.json({ 
      success: true, 
      token, 
      user: { 
        _id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role,
        photoURL: user.photoURL 
      } 
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;