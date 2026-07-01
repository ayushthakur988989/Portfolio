import { findSession, readSessionToken } from '../utils/auth.js';

export const requireAuth = async (request, response, next) => {
  try {
    const token = readSessionToken(request);

    if (!token) {
      return response.status(401).json({ message: 'Authentication required' });
    }

    const session = await findSession(token);
    const user = session?.user;

    if (!user) {
      return response.status(401).json({ message: 'Account no longer exists' });
    }

    request.user = user;
    next();
  } catch {
    return response.status(401).json({ message: 'Invalid or expired session' });
  }
};

export const requireRole = (...roles) => (request, response, next) => {
  if (!request.user || !roles.includes(request.user.role)) {
    return response.status(403).json({ message: 'You do not have permission to access this resource' });
  }

  next();
};
