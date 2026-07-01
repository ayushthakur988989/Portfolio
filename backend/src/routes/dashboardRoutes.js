import { Router } from 'express';
import { adminDashboard, userDashboard } from '../controllers/dashboardController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/user', requireAuth, requireRole('user'), userDashboard);
router.get('/admin', requireAuth, requireRole('admin'), adminDashboard);

export default router;
