// Businesses route
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Businesses endpoint - to be implemented' });
});

export default router;