import { Router, Request, Response } from 'express';
import Item from './item.model';
import { protect, adminOnly, AuthRequest } from '../../middleware/auth';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
  
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    const { search, category, priceMin, priceMax, sort } = req.query;
    const filter: any = {};

    
    if (search) {
      filter.$or = [
        { title: { $regex: search as string, $options: 'i' } },
        { description: { $regex: search as string, $options: 'i' } }
      ];
    }

    if (category && category !== 'all') {
      filter.category = (category as string).toLowerCase();
    }

    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = Number(priceMin);
      if (priceMax) filter.price.$lte = Number(priceMax);
    }


    const sortCriteria = `${(sort as string) || '-createdAt'} _id`;

    const items = await Item.find(filter)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Item.countDocuments(filter);

  
    res.json({ 
      success: true, 
      data: items, 
      meta: { 
        total, 
        page, 
        limit,
        
        totalPages: Math.ceil(total / limit) 
      } 
    });
  } catch (err: any) {
    console.error('Explore Fetch Error:', err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await Item.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, data: item });
  } catch (err: any) {
    res.status(500).json({ success: false, message: 'Invalid ID format' });
  }
});


router.post('/', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const authReq = req as AuthRequest;
    const newItem = new Item({ ...req.body, createdBy: authReq.user?.id });
    const saved = await newItem.save();
    res.status(201).json({ success: true, data: saved });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});


router.put('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: updated });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});


router.delete('/:id', protect, adminOnly, async (req: Request, res: Response) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;