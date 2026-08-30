import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { readFile } from 'node:fs/promises';
import { finalizeEvent } from 'nostr-tools/pure';
import { requireApiKey, sanitizeText, securityHeaders, securityGuard, validateRoastQuery } from './lib/security.js';

const app = express();
const port = Number(process.env.PORT || 8787);
const allowed = (process.env.CORS_ORIGINS || '').split(',').map(x => x.trim()).filter(Boolean);
const roasts = JSON.parse(await readFile(new URL('./roasts.json', import.meta.url), 'utf8'));
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: allowed.length ? allowed : false, methods: ['GET','OPTIONS'], allowedHeaders: ['X-API-Key','Authorization','Content-Type'] }));
app.use(express.json({ limit: '8kb', strict: true }));
app.use(securityHeaders);
app.use(securityGuard);
app.use(rateLimit({ windowMs: 60_000, limit: 60, standardHeaders: 'draft-7', legacyHeaders: false, message: { error: 'Rate limit exceeded. Try again shortly.', code: 'rate_limited' } }));
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'MemeAPI' }));
app.get('/api/v1/roast', requireApiKey, validateRoastQuery, (req, res) => {
  const { mode, visibility } = req.roastOptions;
  const list = Array.isArray(roasts[mode]) ? roasts[mode] : [];
  if (!list.length) return res.status(503).json({ error: 'Content unavailable.', code: 'content_unavailable', requestId: req.requestId });
  const text = sanitizeText(list[Math.floor(Math.random() * list.length)]);
  const data = { type: 'roast', text, mode, requestId: req.requestId };
  if (visibility === 'private') return res.json({ data, meta: { visibility, requestId: req.requestId } });

  const privateKey = process.env.NOSTR_PRIVATE_KEY;
  if (!/^[0-9a-fA-F]{64}$/.test(privateKey || '')) return res.status(503).json({ error: 'Public signing is not configured.', code: 'signing_unavailable', requestId: req.requestId });
  const event = finalizeEvent({
    kind: 1,
    created_at: Math.floor(Date.now() / 1000),
    tags: [['t', 'memeprojects'], ['t', 'roast'], ['m', mode]],
    content: JSON.stringify({ type: data.type, text: data.text, mode: data.mode })
  }, privateKey);
  res.json({ data: { type: 'nostr-event', event }, meta: { visibility, requestId: req.requestId } });
});
app.get('/api/v1/docs', (_req, res) => res.sendFile(new URL('./api.html', import.meta.url)));
app.use((err, req, res, _next) => {
  console.warn(JSON.stringify({ event: 'request_error', requestId: req.requestId || null, message: err.message }));
  res.status(400).json({ error: 'Invalid request.', code: 'invalid_request', requestId: req.requestId || null });
});
app.listen(port, () => console.log(`MemeAPI listening on ${port}`));
