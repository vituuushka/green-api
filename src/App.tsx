
import './App.css'
import { Link, Outlet } from 'react-router-dom'

function App() {
  

  return (
    <div>
      <nav>
        
        <Link to="/">Вход</Link> | <Link to="/contact">Выбрать контакт</Link>
      </nav>
      <hr />
      <Outlet /> 
    </div>
  )
}

export default App
