import React, { useState, useEffect } from 'react';
import { api } from '../api';
import { UserPlus, Trash2, Users } from 'lucide-react';

export const StudentModule = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const load = () => api.students.list().then(setStudents);
  useEffect(() => { load(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    await api.students.create(name, email);
    setName('');
    setEmail('');
    load();
  };

  const handleDelete = async (id: number) => {
    await api.students.delete(id);
    load();
  };

  return (
    <div className="module-card">
      <div className="module-header">
        <Users size={24} />
        <h2>Students</h2>
      </div>
      
      <form onSubmit={handleAdd} className="module-form">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email Address" type="email" required />
        <button type="submit" className="btn-primary">
          <UserPlus size={18} />
          Add Student
        </button>
      </form>

      <div className="list-container">
        {students.map(s => (
          <div key={s.id} className="list-item">
            <div>
              <strong>{s.name}</strong>
              <p>{s.email}</p>
            </div>
            <button onClick={() => handleDelete(s.id)} className="btn-danger">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
