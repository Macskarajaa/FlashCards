import { Route, Routes } from 'react-router'
import './App.css'
import { Topic } from './pages/Topic'
import { Home } from './pages/Home'
import { MyNavBar } from './components/myNavBar'
import { Card } from './pages/Card'
import { AddCard } from './components/AddCard'
function App() {

  return (
    <div>
      <MyNavBar/>
      <br />
      <br />
      <br />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/topics" element={<Topic />} />
      <Route path="/topics/:id" element={<Card />} />
      <Route path="/addnew" element={<AddCard />} />
      </Routes>
    </div>
  )
}

export default App
