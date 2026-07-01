import { createUser, findUserByEmail, updateLastLogin } from '../models/User.js';
import { clearAuthCookie, createSession, deleteSession, readSessionToken, setAuthCookie } from '../utils/auth.js';
import { hashPassword, verifyPassword } from '../utils/password.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const publicUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  lastLoginAt: user.lastLoginAt,
});

export const register = async (request, response) => {
  const name = String(request.body.name || '').trim();
  const email = String(request.body.email || '').trim().toLowerCase();
  const password = String(request.body.password || '');

  if (name.length < 2 || !emailPattern.test(email) || password.length < 8) {
    return response.status(400).json({
      message: 'Enter a valid name, email, and password of at least 8 characters',
    });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return response.status(409).json({ message: 'An account with this email already exists' });
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser({ name, email, passwordHash, role: 'user' });
  const token = await createSession(user._id.toString());
  setAuthCookie(response, token);

  return response.status(201).json({ user: publicUser(user) });
};

export const login = async (request, response) => {
  const email = String(request.body.email || '').trim().toLowerCase();
  const password = String(request.body.password || '');
  const expectedRole = request.body.role === 'admin' ? 'admin' : 'user';

  const user = await findUserByEmail(email, true);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return response.status(401).json({ message: 'Invalid email or password' });
  }

  if (user.role !== expectedRole) {
    return response.status(403).json({
      message: `This account cannot sign in as ${expectedRole}`,
    });
  }

  user.lastLoginAt = new Date();
  await updateLastLogin(user._id.toString(), user.lastLoginAt);

  const token = await createSession(user._id.toString());
  setAuthCookie(response, token);

  return response.json({ user: publicUser(user) });
};

export const logout = async (request, response) => {
  await deleteSession(readSessionToken(request));
  clearAuthCookie(response);
  return response.json({ message: 'Logged out successfully' });
};

export const currentUser = (request, response) => {
  return response.json({ user: publicUser(request.user) });
};
