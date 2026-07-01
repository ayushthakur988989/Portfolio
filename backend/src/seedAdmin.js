import { createUser, findUserByEmail, updateUserRole } from './models/User.js';
import { hashPassword } from './utils/password.js';

export const seedAdmin = async () => {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    console.warn('Admin seed skipped: ADMIN_NAME, ADMIN_EMAIL, or ADMIN_PASSWORD is missing');
    return;
  }

  const existingAdmin = await findUserByEmail(email);
  if (existingAdmin) {
    if (existingAdmin.role !== 'admin') {
      await updateUserRole(existingAdmin._id.toString(), 'admin');
    }
    return;
  }

  const passwordHash = await hashPassword(password);
  await createUser({ name, email, passwordHash, role: 'admin' });
  console.log(`Admin account created for ${email}`);
};
