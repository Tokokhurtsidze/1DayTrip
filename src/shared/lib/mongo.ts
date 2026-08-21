import mongoose from 'mongoose';

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 1000;

class MongoClientManager {
  async connect(retries = MAX_RETRIES): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGO_URI!, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        keepAlive: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      if (retries <= 0) {
        console.error('MongoDB connection failed permanently:', error);
        throw error;
      }
      console.warn(`MongoDB connection failed, retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      return this.connect(retries - 1);
    }
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}

export const mongo = new MongoClientManager();
export { MongoClientManager };
