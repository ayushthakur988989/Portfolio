import { createHash, randomBytes } from 'node:crypto';
import { getDatabase } from '../config/db.js';
import { findUserById } from '../models/User.js';

const COOKIE_NAME = 'portfolio_session';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

const hashToken = (token) => createHash('sha256').update(token).digest('hex');

export const createSession = async (userId) => {
  const token = randomBytes(32).toString('base64url');
  await getDatabase().collection('sessions').insertOne({
    tokenHash: hashToken(token),
    user: userId,
    expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
    createdAt: new Date(),
  });
  return token;
};

export const findSession = async (token) => {
  if (!token) return null;
  const session = await getDatabase().collection('sessions').findOne({
    tokenHash: hashToken(token),
    expiresAt: { $gt: new Date() },
  });
  if (!session) return null;
  return { ...session, user: await findUserById(session.user) };
};

export const deleteSession = async (token) => {
  if (token) {
    await getDatabase().collection('sessions').deleteOne({ tokenHash: hashToken(token) });
  }
};

export const readSessionToken = (request) => {
  const cookie = request.headers.cookie || '';
  const entries = cookie.split(';').map((item) => item.trim().split('='));
  const value = entries.find(([name]) => name === COOKIE_NAME)?.[1];
  return value ? decodeURIComponent(value) : null;
};

export const setAuthCookie = (response, token) => {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure; SameSite=None' : '; SameSite=Lax';
  response.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Path=/; Max-Age=${SESSION_DURATION_MS / 1000}${secure}`
  );
};

export const clearAuthCookie = (response) => {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure; SameSite=None' : '; SameSite=Lax';
  response.setHeader('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0${secure}`);
};
