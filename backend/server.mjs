// --- Imports ---
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import webPush from 'web-push';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import fetch from 'node-fetch';
import admin from 'firebase-admin';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import crypto from 'crypto';
import Signal from './models/signal.js';
import Response from './models/response.js';
import AdminConfig from './models/config.js';
import serviceAccount from './service-account.json' assert { type: 'json' };
import { checkEnv } from './checkEnv.js';
import axios from 'axios';
import fs from 'fs';
import TradeLog from './models/trade_logs.js';
import Stripe from 'stripe';
import OpenAI from 'openai';
import tradeRoutes from './routes/trade.js';



dotenv.config();
console.log('🧪 OPENAI_API_KEY loaded:', process.env.OPENAI_API_KEY);
checkEnv([
  'PORT',
  'ADMIN_SECRET',
  'DATABASE_URL',
  'VAPID_PUBLIC_KEY',
  'VAPID_PRIVATE_KEY',
  'JWT_SECRET',
  'DISCORD_WEBHOOK_URL',
]);

// --- Stripe ---
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2022-11-15' });

// --- Firebase ---
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// --- MongoDB ---
let DISPATCH_STATE = false;
let REGIME_MODE = 'auto';

async function connectDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      serverApi: { version: '1', strict: true, deprecationErrors: true },
    });
    console.log('✅ Connected to MongoDB Atlas');

    AdminConfig.findOne().then((doc) => {
      if (doc) {
        DISPATCH_STATE = doc.dispatchEnabled;
        REGIME_MODE = doc.regimeMode;
        console.log('🧠 Admin config loaded');
      } else {
        new AdminConfig().save();
        console.log('⚙️ Default admin config created');
      }
    });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
}

// --- Import Balance Snapshot ---
import { captureBalanceSnapshot } from './jobs/balanceSnapshot.js';


// --- App Init ---
const app = express();
const PORT = process.env.PORT || 4000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
});

// --- WebSocket ---
io.on('connection', (socket) => {
  console.log('🔌 WebSocket connected:', socket.id);
  socket.on('joinRoom', (room) => socket.join(room));
  socket.on('disconnect', () => {
    console.log('❌ Disconnected:', socket.id);
  });
});

// --- Middleware ---
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

// --- Stripe Webhook Route (must come BEFORE bodyParser.json) ---
app.post('/api/webhook/stripe', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    console.log('✅ Payment succeeded!');
    console.log('Session Details:', session);

    const customerEmail = session.customer_email;

    if (customerEmail) {
      await subscribeToMailerLite(customerEmail);
    }
  }

  res.status(200).json({ received: true });
});

// ✅ Now body parsing for regular APIs
app.use(bodyParser.json());

// --- MailerLite Subscribe Function ---
async function subscribeToMailerLite(email) {
  try {
    const response = await fetch('https://api.mailerlite.com/api/v2/groups/' + MAILERLITE_GROUP_ID + '/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': MAILERLITE_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        resubscribe: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`MailerLite API error: ${response.statusText}`);
    }

    console.log(`✅ ${email} added to MailerLite PAID USERS group.`);
  } catch (error) {
    console.error('❌ MailerLite subscribe error:', error.message);
  }
}

// ✅ Dummy Users
const USERS = [
  { username: 'admin', password: bcrypt.hashSync('pass123', 10), role: 'admin' },
];

// ✅ VAPID Setup
webPush.setVapidDetails(
  'mailto:support@jonomor.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// ✅ Auth Middleware
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Token missing' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

const requireRole = (role) => (req, res, next) => {
  if (req.user.role !== role) {
    return res.status(403).json({ error: 'Access denied: Insufficient role' });
  }
  next();
};

// ✅ Auth Routes
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find((u) => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    path: '/',
    maxAge: 1000 * 60 * 60 * 12,
  });
  res.json({ success: true });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

app.get('/api/dashboard', authMiddleware, (req, res) => {
  res.json({
    message: "You're in the ULTRA+ dashboard",
    username: 'admin',
    role: 'admin',
  });
});

// ✅ New endpoint
app.get('/api/ml/status', (req, res) => {
  try {
    const stats = fs.statSync('./ml/trade_predictor.joblib');
    res.json({
      lastModified: stats.mtime,
      sizeBytes: stats.size,
      status: 'Model Ready',
    });
  } catch (error) {
    res.status(500).json({ error: 'Model not found' });
  }
});

// ✅ Signal Save
app.post('/api/signal', async (req, res) => {
  try {
    const { type, asset, confidence, timestamp } = req.body;
    const payload = { symbol: asset, ai_signal: type, time: timestamp };
    const discordHash = crypto.createHash('md5').update(JSON.stringify(payload)).digest('hex').slice(0, 12);

    const newSignal = new Signal({
      symbol: req.body.symbol,
      action: req.body.action,
      brain: req.body.brain,
      reason: req.body.reason,
      confidence: req.body.confidence,
      timestamp: new Date(),
    });

    await newSignal.save();
    io.to("trading-alerts").emit("newSignal", newSignal);
    res.status(201).json({ success: true, id: newSignal._id });
  } catch (err) {
    console.error('Signal save error:', err);
    res.status(500).json({ error: 'Failed to save signal' });
  }
});

// ✅ Model Reload
app.post('/api/model/reload', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:5005/reload');
    res.json(response.data);
  } catch (error) {
    console.error('Reload API Error:', error.message);
    res.status(500).json({ error: 'Failed to reload model' });
  }
});

// ✅ Model Prediction
app.post('/api/model/predict', async (req, res) => {
  try {
    const { atrEntry, volumeAtEntry, volumeSpike, priceVsMA, confidence, fallbackActive } = req.body;

    const response = await axios.post('http://localhost:5005/predict', {
      atrEntry,
      volumeAtEntry,
      volumeSpike,
      priceVsMA,
      confidence,
      fallbackActive
    });

    res.json(response.data);
  } catch (error) {
    console.error('Prediction API Error:', error.message);
    res.status(500).json({ error: 'Failed to predict' });
  }
});

// ✅ Trade Complete Save
app.post('/api/trade/complete', async (req, res) => {
  const {
    symbol, entryTime, exitTime, entryPrice, exitPrice, atrEntry, atrExit,
    volumeAtEntry, volumeSpike, priceVsMA, regime, confidence, fallbackActive, timeOfDay
  } = req.body;

  const outcome = exitPrice > entryPrice ? 'win' : (exitPrice < entryPrice ? 'loss' : 'breakeven');

  const trade = new TradeLog({
    symbol,
    entryTime,
    exitTime,
    entryPrice,
    exitPrice,
    outcome,
    atrEntry,
    atrExit,
    volumeAtEntry,
    volumeSpike,
    priceVsMA,
    regime,
    confidence,
    fallbackActive,
    timeOfDay,
  });

  await trade.save();
  res.status(201).json({ success: true, id: trade._id });
});

// ✅ Admin State Endpoints
app.get('/api/admin/state', authMiddleware, requireRole('admin'), (req, res) => {
  res.json({
    dispatch: DISPATCH_STATE,
    regime: REGIME_MODE,
  });
});

app.post('/api/admin/dispatch', authMiddleware, requireRole('admin'), async (req, res) => {
  const { enabled } = req.body;
  DISPATCH_STATE = enabled;
  await AdminConfig.findOneAndUpdate({}, { dispatchEnabled: enabled });
  res.json({ success: true, dispatch: DISPATCH_STATE });
});

app.post('/api/admin/regime', authMiddleware, requireRole('admin'), async (req, res) => {
  const { mode } = req.body;
  REGIME_MODE = mode;
  await AdminConfig.findOneAndUpdate({}, { regimeMode: mode });
  res.json({ success: true, regime: REGIME_MODE });
});

// ✅ Route Imports
import signalWebhook from './api/webhook/signal.js';
import discordBroadcast from './api/discord/broadcast.js';
import adminRoutes from './routes/admin.js';
import signalRoutes from './routes/signals.js';
import exchangeRoutes from './routes/exchange.js';
import tradeComplete from './routes/tradeComplete.js';
import tradeHistoryRoute from './routes/tradeHistory.js';






app.use('/api/webhook/signal', signalWebhook);
app.use('/api/discord', discordBroadcast);
app.use('/api/signals', signalRoutes);
app.use('/api', adminRoutes);
app.use('/api/trade', tradeRoutes);
app.use('/api/trade/complete', tradeComplete);
app.use('/api/trade/history', tradeHistoryRoute);
app.use('/api', exchangeRoutes);
app.use((req, res, next) => {
  req.io = io;
  next();
});




// ✅ Stripe Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required to start checkout session.' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'ULTRA+ Access',
              description: 'Lifetime Early Access to ULTRA+ Trading System',
            },
            unit_amount: 9900, // $99.00 USD
          },
          quantity: 1,
        },
      ],
      success_url: `https://yourdomain.com/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://yourdomain.com/pricing`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('❌ Stripe Checkout Session Error:', error.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// ✅ Signal Log Route
app.get('/api/signals/log', authMiddleware, requireRole('admin'), async (req, res) => {
  const recent = await Signal.find().sort({ timestamp: -1 }).limit(50);
  res.json({ recent });
});

// ✅ OPENAI Assistant Setup

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Assistant Streaming Endpoint
app.get('/api/assistant', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const question = req.query.q || "Explain trading bots.";

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a tactical trading assistant for ULTRA SYSTEM. Only answer about bots, signals, markets, optimizations." },
        { role: "user", content: question },
      ],
      temperature: 0.5,
      stream: true,
    });

    for await (const chunk of completion) {
      const token = chunk.choices[0]?.delta?.content;
      if (token) {
        res.write(`data: ${token}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Streaming error:', error.message || error);
    res.end();
  }
});

// ✅ Start Server
async function startServer() {
  try {
    await connectDB();

    // ✅ Place your balance snapshot interval here
    setInterval(() => {
      captureBalanceSnapshot();
    }, 5 * 60 * 1000); // Every 5 minutes

    const doc = await AdminConfig.findOne();
    if (doc) {
      DISPATCH_STATE = doc.dispatchEnabled;
      REGIME_MODE = doc.regimeMode;
      console.log('🧠 Admin config loaded');
    } else {
      await new AdminConfig().save();
      console.log('⚙️ Default admin config created');
    }

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
    process.exit(1);
  }
}



startServer();
