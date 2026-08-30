import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { readFile } from 'node:fs/promises';
import { requireApiKey, sanitizeText, securityHeaders } from './lib/security.js';

const app = express();
const port = Number(process.env.PORT || 8787);
const allowed = (process.env.CORS_ORIGINS || '').split(',').map(x => x.trim()).filter(Boolean);
const roasts = JSON.parse(await readFile(new URL('./roasts.json', import.meta.url), 'utf8'));
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: allowed.length ? allowed : false, methods: ['GET','OPTIONS'], allowedHeaders: ['X-API-Key','Authorization','Content-Type'] }));
app.use(express.json({ limit: '8kb', strict: true }));
app.use(securityHeaders);
app.use(rateLimit({ windowMs: 60_000, limit: 60, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Rate limit exceeded. Try again shortly.' } }));
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'MemeAPI' }));
app.get('/api/v1/roast', requireApiKey, (req, res) => {
  const mode = ['standard','extra-spicy'].includes(req.query.mode) ? req.query.mode : 'standard';
  const list = Array.isArray(roasts[mode]) ? roasts[mode] : [];
  if (!list.length) return res.status(503).json({ error: 'Content unavailable.' });
  const text = list[Math.floor(Math.random() * list.length)];
  res.json({ data: { type: 'roast', text: sanitizeText(text), mode }, meta: { requestId: req.apiKeyId } });
});
app.get('/api/v1/docs', (_req, res) => res.sendFile(new URL('./api.html', import.meta.url)));
app.use((err, _req, res, _next) => res.status(400).json({ error: 'Invalid request.' }));
app.listen(port, () => console.log(`MemeAPI listening on ${port}`));
