import { useState } from 'react'
import './css/index.css'
import Home from './components/pages/Home'
import Login from './components/pages/Login'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  return isLoggedIn ? <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : <Login />
}

export default App
