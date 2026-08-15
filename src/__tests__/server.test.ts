import { describe, it, expect } from 'vitest';
import { createServer } from '../server.ts';

describe('Server Initialization', () => {
  it('creates express app instance and health check route', () => {
    const { app, bot } = createServer();
    expect(app).toBeDefined();
    expect(bot).toBeNull();
  });

  it('creates grammY bot instance when botToken is provided', () => {
    const token = '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11';
    const { app, bot } = createServer(token, 'https://example.com/app');
    expect(app).toBeDefined();
    expect(bot).not.toBeNull();
  });
});
