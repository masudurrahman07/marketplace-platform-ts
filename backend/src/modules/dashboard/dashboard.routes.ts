import { Router, Response } from 'express';
import User from '../auth/auth.model';
import Item from '../items/item.model';
import Booking from '../bookings/booking.model';
import { protect, AuthRequest } from '../../middleware/auth';

const router = Router();


router.get('/stats', protect, async (_req: AuthRequest, res: Response) => {
  try {
    const [totalUsers, totalItems, bookings] = await Promise.all([
      User.countDocuments(),
      Item.countDocuments(),
      Booking.find(),
    ]);
    const totalOrders = bookings.length;
    const totalRevenue = bookings.reduce((sum, b) => sum + b.totalPrice, 0);
    res.json({ success: true, data: { totalUsers, totalItems, totalOrders, totalRevenue } });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
