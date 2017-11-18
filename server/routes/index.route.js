import express from 'express';
import userRoutes from './user.route';
import nhanvienRoutes from './nhanvien.route';
import khachhangRoutes from './khachhang.route';
import hangRoutes from './hang.route';
import banRoutes from './ban.route';
import authRoutes from './auth.route';
import postRoutes from './post.route';
import phieuxuatRoutes from './phieuxuat.route';
import phieuxuatctietRoutes from './phieuxuatctiet.route';
import phieunhapRoutes from './phieunhap.route';
import phieunhapctietRoutes from './phieunhapctiet.route';
import giahangRoutes from './giahang.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);
router.use('/nhanviens', nhanvienRoutes);
router.use('/khachhangs', khachhangRoutes);
router.use('/hangs', hangRoutes);
router.use('/bans', banRoutes);
router.use('/phieuxuats', phieuxuatRoutes);
router.use('/phieuxuatctiets', phieuxuatctietRoutes);
router.use('/phieunhaps', phieunhapRoutes);
router.use('/phieunhapctiets', phieunhapctietRoutes);
router.use('/giahangs', giahangRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

router.use('/posts', postRoutes);

export default router;
