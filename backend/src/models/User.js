import { ObjectId } from 'mongodb';
import { getDatabase } from '../config/db.js';

const users = () => getDatabase().collection('users');

export const findUserByEmail = (email, includePassword = false) => {
  const options = includePassword ? {} : { projection: { passwordHash: 0 } };
  return users().findOne({ email }, options);
};

export const findUserById = (id) => {
  if (!ObjectId.isValid(id)) return null;
  return users().findOne({ _id: new ObjectId(id) }, { projection: { passwordHash: 0 } });
};

export const createUser = async ({ name, email, passwordHash, role = 'user' }) => {
  const now = new Date();
  const user = { name, email, passwordHash, role, lastLoginAt: null, createdAt: now, updatedAt: now };
  const result = await users().insertOne(user);
  return { ...user, _id: result.insertedId };
};

export const updateLastLogin = async (id, lastLoginAt) => {
  await users().updateOne(
    { _id: new ObjectId(id) },
    { $set: { lastLoginAt, updatedAt: new Date() } }
  );
};

export const updateUserRole = async (id, role) => {
  await users().updateOne(
    { _id: new ObjectId(id) },
    { $set: { role, updatedAt: new Date() } }
  );
};

export const countUsers = () => users().countDocuments({ role: 'user' });

export const findRecentUsers = () => users()
  .find({ role: 'user' }, { projection: { passwordHash: 0 } })
  .sort({ createdAt: -1 })
  .limit(10)
  .toArray();
