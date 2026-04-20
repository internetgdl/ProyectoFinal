import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

// --- Students CRUD ---

app.get('/students', async (c) => {
	const { results } = await c.env.DB.prepare('SELECT * FROM students').all();
	return c.json(results);
});

app.post('/students', async (c) => {
	const { name, email } = await c.req.json<{ name: string; email: string }>();
	const { success } = await c.env.DB.prepare('INSERT INTO students (name, email) VALUES (?, ?)').bind(name, email).run();
	return c.json({ success }, success ? 201 : 400);
});

app.put('/students/:id', async (c) => {
	const id = c.req.param('id');
	const { name, email } = await c.req.json<{ name: string; email: string }>();
	const { success } = await c.env.DB.prepare('UPDATE students SET name = ?, email = ? WHERE id = ?').bind(name, email, id).run();
	return c.json({ success });
});

app.delete('/students/:id', async (c) => {
	const id = c.req.param('id');
	const { success } = await c.env.DB.prepare('DELETE FROM students WHERE id = ?').bind(id).run();
	return c.json({ success });
});

// --- Books CRUD ---

app.get('/books', async (c) => {
	const { results } = await c.env.DB.prepare('SELECT b.*, s.name as student_name FROM books b LEFT JOIN students s ON b.student_id = s.id').all();
	return c.json(results);
});

app.post('/books', async (c) => {
	const { title, author, student_id } = await c.req.json<{ title: string; author: string; student_id?: number }>();
	const { success } = await c.env.DB.prepare('INSERT INTO books (title, author, student_id) VALUES (?, ?, ?)').bind(title, author, student_id || null).run();
	return c.json({ success }, success ? 201 : 400);
});

app.put('/books/:id', async (c) => {
	const id = c.req.param('id');
	const { title, author, student_id } = await c.req.json<{ title: string; author: string; student_id?: number }>();
	const { success } = await c.env.DB.prepare('UPDATE books SET title = ?, author = ?, student_id = ? WHERE id = ?').bind(title, author, student_id || null, id).run();
	return c.json({ success });
});

app.delete('/books/:id', async (c) => {
	const id = c.req.param('id');
	const { success } = await c.env.DB.prepare('DELETE FROM books WHERE id = ?').bind(id).run();
	return c.json({ success });
});

export default app;
