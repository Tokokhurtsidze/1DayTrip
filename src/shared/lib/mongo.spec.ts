import mongoose from 'mongoose';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('mongoose', async (importOriginal) => {
  const actual = await importOriginal<typeof mongoose>();
  return {
    default: {
      ...actual.default,
      connect: vi.fn(),
      disconnect: vi.fn(),
    },
  };
});

import { MongoClientManager } from './mongo';

describe('MongoClientManager', () => {
  let manager: MongoClientManager;

  beforeEach(() => {
    vi.clearAllMocks();
    manager = new MongoClientManager();
  });

  it('connects to MongoDB on first call', async () => {
    vi.mocked(mongoose.connect).mockResolvedValueOnce(mongoose);
    await manager.connect();
    expect(mongoose.connect).toHaveBeenCalledOnce();
    expect(mongoose.connect).toHaveBeenCalledWith(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
  });

  it('allows multiple connect calls', async () => {
    vi.mocked(mongoose.connect).mockResolvedValueOnce(mongoose).mockResolvedValueOnce(mongoose);
    await manager.connect();
    await manager.connect();
    expect(mongoose.connect).toHaveBeenCalledTimes(2);
  });

  it('retries on failure then succeeds', async () => {
    vi.mocked(mongoose.connect)
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValueOnce(mongoose);
    await manager.connect();
    expect(mongoose.connect).toHaveBeenCalledTimes(2);
  });

  it('throws after max retries exhausted', async () => {
    vi.mocked(mongoose.connect).mockRejectedValue(new Error('always fail'));
    await expect(manager.connect(0)).rejects.toThrow('always fail');
  });

  it('disconnect calls mongoose.disconnect', async () => {
    vi.mocked(mongoose.disconnect).mockResolvedValueOnce();
    await manager.disconnect();
    expect(mongoose.disconnect).toHaveBeenCalledOnce();
  });
});
