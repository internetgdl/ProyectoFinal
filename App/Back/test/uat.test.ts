import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import app from '../src/index';

// Mocking D1Database
const mockDB = {
  prepare: jest.fn().mockReturnThis() as any,
  bind: jest.fn().mockReturnThis() as any,
  all: jest.fn().mockResolvedValue({ results: [] } as any) as any,
  run: jest.fn().mockResolvedValue({ success: true } as any) as any,
};

describe('UAT: Library System API', () => {
  // We pass the mock DB in the env object which Hono expects
  const env = { DB: mockDB as any };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Students Module', () => {
    it('should return a list of students (GET /students)', async () => {
      const res = await app.request('/students', {}, env);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body)).toBe(true);
      expect(mockDB.prepare).toHaveBeenCalledWith('SELECT * FROM students');
    });

    it('should create a new student (POST /students)', async () => {
      const res = await app.request('/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Eduardo', email: 'eduardo@example.com' }),
      }, env);
      expect(res.status).toBe(201);
      expect(mockDB.prepare).toHaveBeenCalledWith('INSERT INTO students (name, email) VALUES (?, ?)');
    });
  });

  describe('Books Module', () => {
    it('should return a list of books with student names (GET /books)', async () => {
      const res = await app.request('/books', {}, env);
      expect(res.status).toBe(200);
      expect(mockDB.prepare).toHaveBeenCalledWith(expect.stringContaining('SELECT b.*, s.name'));
    });

    it('should create a new book (POST /books)', async () => {
      const res = await app.request('/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Terraform Guide', author: 'Hashi', student_id: 1 }),
      }, env);
      expect(res.status).toBe(201);
      expect(mockDB.prepare).toHaveBeenCalledWith('INSERT INTO books (title, author, student_id) VALUES (?, ?, ?)');
    });
  });
});
