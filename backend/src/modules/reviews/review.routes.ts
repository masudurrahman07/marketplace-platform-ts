import { Router, Response } from 'express';
import Review from './review.model';
import User from '../auth/auth.model'; // Added User model import
import { protect, AuthRequest } from '../../middleware/auth';

const router = Router();


router.get('/my', protect, async (req: AuthRequest, res: Response) => {
  try {
    const reviews = await Review.find({ userId: req.user!.id }).sort('-createdAt');
    res.json({ success: true, data: reviews });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/item/:itemId', async (req, res: Response) => {
  try {
    const reviews = await Review.find({ itemId: req.params.itemId }).sort('-createdAt');
    res.json({ success: true, data: reviews });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', protect, async (req: AuthRequest, res: Response) => {
  try {
    
    const userProfile = await User.findById(req.user!.id);
    

    const review = await Review.create({ 
      ...req.body, 
      userId: req.user!.id,
      userName: userProfile?.name || 'Anonymous User'
    });

    res.status(201).json({ success: true, data: review });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', protect, async (req: AuthRequest, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    
  
    if (review.userId.toString() !== req.user!.id && req.user!.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await review.deleteOne();
    res.json({ success: true, message: 'Review deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;