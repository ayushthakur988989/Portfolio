import 'dotenv/config';
import express from 'express';
import { connectDatabase } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import { seedAdmin } from './seedAdmin.js';

const app = express();
const port = Number(process.env.PORT) || 5000;

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', clientUrl);
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Referrer-Policy', 'no-referrer');
  if (request.method === 'OPTIONS') return response.sendStatus(204);
  next();
});
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: 'Internal server error' });
});

const start = async () => {
  await connectDatabase();
  await seedAdmin();
  app.listen(port, () => console.log(`API running on http://localhost:${port}`));
};

start().catch((error) => {
  console.error(`Unable to start API: ${error.message}`);
  process.exit(1);
});
