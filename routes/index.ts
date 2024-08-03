import { Router, Request, Response, NextFunction } from 'express';
import usersRouter from "./user.routes";
import authRouter from "./auth.routes";

const router = Router()

// Set up routes
router.use('/users', usersRouter);
router.use('/auth', authRouter);

// Global error handler
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

// Export router
export default router;