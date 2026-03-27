import { Router, Response } from 'express';
import User from '../auth/auth.model';
import { protect, adminOnly, AuthRequest } from '../../middleware/auth';

const router = Router();

router.get('/', protect, adminOnly, async (_req, res: Response) => {
  try {
    const users = await User.find().select('-password').sort('-createdAt');
    res.json({ success: true, data: users });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/me', protect, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user!.id).select('-password');
    res.json({ success: true, data: user });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});


router.patch('/me', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(req.user!.id, { name }, { new: true }).select('-password');
    res.json({ success: true, data: user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
