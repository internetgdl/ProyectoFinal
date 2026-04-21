import { StudentModule } from './components/StudentModule'
import { BookModule } from './components/BookModule'
import * as Sentry from '@sentry/react'
import './index.css'

function ErrorButton() {
  return (
    <button
      className="btn-danger"
      style={{ 
        marginTop: '1rem', 
        padding: '0.5rem 1rem', 
        fontSize: '0.8rem',
        borderRadius: '0.5rem',
        cursor: 'pointer'
      }}
      onClick={() => {
        // Send a log before throwing the error
        console.log('User triggered test error');
        
        // Send a test metric
        Sentry.metrics.increment('test_error_button_click', 1);
        
        // Throw the error
        throw new Error('Sentry Frontend Test Error: Break the world!');
      }}
    >
      ⚠️ Debug: Trigger Sentry Error
    </button>
  );
}

function App() {
  return (
    <div className="container">
      <header className="app-header">
        <h1>School Library Manager</h1>
        <p>Manage students and their book assignments</p>
        <ErrorButton />
      </header>
      
      <main className="dashboard">
        <StudentModule />
        <BookModule />
      </main>
    </div>
  )
}

export default App
