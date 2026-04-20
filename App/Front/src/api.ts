const API_URL = import.meta.env.VITE_API_URL || 'https://my-app-backend.internetgdl.workers.dev';

export const api = {
  students: {
    list: () => fetch(`${API_URL}/students`).then(res => res.json()),
    create: (name: string, email: string) => fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    }).then(res => res.json()),
    delete: (id: number) => fetch(`${API_URL}/students/${id}`, { method: 'DELETE' }).then(res => res.json()),
  },
  books: {
    list: () => fetch(`${API_URL}/books`).then(res => res.json()),
    create: (title: string, author: string, student_id?: number) => fetch(`${API_URL}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, student_id })
    }).then(res => res.json()),
    delete: (id: number) => fetch(`${API_URL}/books/${id}`, { method: 'DELETE' }).then(res => res.json()),
  }
};
