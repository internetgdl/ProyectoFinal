import { StudentModule } from './components/StudentModule'
import { BookModule } from './components/BookModule'
import './index.css'

function App() {
  return (
    <div className="container">
      <header className="app-header">
        <h1>School Library Manager</h1>
        <p>Manage students and their book assignments</p>
      </header>
      
      <main className="dashboard">
        <StudentModule />
        <BookModule />
      </main>
    </div>
  )
}

export default App
