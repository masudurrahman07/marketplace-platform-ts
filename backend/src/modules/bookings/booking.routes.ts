import { Router, Response } from 'express';
import Booking from './booking.model';
import { protect, adminOnly, AuthRequest } from '../../middleware/auth';

const router = Router();


router.get('/', protect, async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ userId: req.user!.id })
      .populate('itemId') 
      .sort('-createdAt');
    res.json({ success: true, data: bookings });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, async (req: AuthRequest, res: Response) => {
  try {
    
    const booking = await Booking.create({ 
      ...req.body, 
      userId: req.user!.id 
    });
    
    res.status(201).json({ success: true, data: booking });
  } catch (err: any) {
    console.error(" Booking Error:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
});


router.patch('/:id/status', protect, adminOnly, async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
