import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <div className="body">
        <Sidebar />
        <Home />
      </div>
    </div>
  )
}

export default App
