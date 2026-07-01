import { MongoClient } from 'mongodb';

let database;

export const connectDatabase = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured');
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  database = client.db();

  await Promise.all([
    database.collection('users').createIndex({ email: 1 }, { unique: true }),
    database.collection('sessions').createIndex({ tokenHash: 1 }, { unique: true }),
    database.collection('sessions').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
  ]);

  console.log(`MongoDB connected: ${database.databaseName}`);
};

export const getDatabase = () => {
  if (!database) throw new Error('Database has not been connected');
  return database;
};
