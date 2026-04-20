import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { BookPlus, Trash2, BookOpen } from 'lucide-react';

export const BookModule = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [studentId, setStudentId] = useState<string>('');

  const load = () => {
    api.books.list().then(setBooks);
    api.students.list().then(setStudents);
  };
  useEffect(() => { load(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) return;
    await api.books.create(title, author, studentId ? parseInt(studentId) : undefined);
    setTitle('');
    setAuthor('');
    setStudentId('');
    load();
  };

  const handleDelete = async (id: number) => {
    await api.books.delete(id);
    load();
  };

  return (
    <div className="module-card">
      <div className="module-header">
        <BookOpen size={24} />
        <h2>Books</h2>
      </div>
      
      <form onSubmit={handleAdd} className="module-form">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Book Title" required />
        <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
        <select value={studentId} onChange={e => setStudentId(e.target.value)}>
          <option value="">No Student Assigned</option>
          {students.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <button type="submit" className="btn-primary">
          <BookPlus size={18} />
          Add Book
        </button>
      </form>

      <div className="list-container">
        {books.map(b => (
          <div key={b.id} className="list-item">
            <div>
              <strong>{b.title}</strong>
              <p>by {b.author}</p>
              {b.student_name && <span className="badge">Assigned to: {b.student_name}</span>}
            </div>
            <button onClick={() => handleDelete(b.id)} className="btn-danger">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
