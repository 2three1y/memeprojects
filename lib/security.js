import crypto from 'node:crypto';

const KEY_PATTERN = /^mk_[A-Za-z0-9_-]{32,}$/;
export function sanitizeText(value, max = 280) {
  return typeof value === 'string' ? value.replace(/[<>]/g, '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, max) : '';
}
export function requireApiKey(req, res, next) {
  const key = req.get('x-api-key') || req.get('authorization')?.replace(/^Bearer\s+/i, '');
  const configured = (process.env.MEME_API_KEYS || '').split(',').map(x => x.trim()).filter(Boolean);
  if (!KEY_PATTERN.test(key || '') || !configured.includes(key)) return res.status(401).json({ error: 'A valid API key is required.' });
  req.apiKeyId = crypto.createHash('sha256').update(key).digest('hex').slice(0, 12);
  next();
}
export function securityHeaders(req, res, next) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'; base-uri 'none'");
  next();
}
