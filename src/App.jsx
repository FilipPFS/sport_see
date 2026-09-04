import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import { DataSourceProvider } from './context/DataSourceContext'
import './App.css'

function App() {
  return (
    <DataSourceProvider>
      <div className="app">
        <Header />
        <div className="body">
          <Sidebar />
          <Home />
        </div>
      </div>
    </DataSourceProvider>
  )
}

export default App
