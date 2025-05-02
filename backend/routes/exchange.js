import express from 'express';
import { getExchangeStatus, getBalanceHistory } from '../controllers/exchangeController.js';

const router = express.Router();

router.get('/exchange-status', getExchangeStatus);
router.get('/balance-history', getBalanceHistory);

export default router;
