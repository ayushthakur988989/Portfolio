import { countUsers, findRecentUsers } from '../models/User.js';

export const userDashboard = (request, response) => {
  return response.json({
    message: `Welcome back, ${request.user.name}`,
    profile: {
      id: request.user._id.toString(),
      name: request.user.name,
      email: request.user.email,
      role: request.user.role,
    },
  });
};

export const adminDashboard = async (_request, response) => {
  const [totalUsers, recentUsers] = await Promise.all([
    countUsers(),
    findRecentUsers(),
  ]);

  return response.json({ totalUsers, recentUsers });
};
