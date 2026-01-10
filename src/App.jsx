import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './pages/Home'
import { Route, Routes } from 'react-router'
import { Topics } from './pages/Topics'
import { Header } from './components/Header'
import { AddCard } from './pages/AddCard'
import { AddTopic } from './pages/AddTopic'
import { Topic } from './pages/Topic'
import { MyAccessProvider } from './context/MyAccessProvider'



function App() {
  const [count, setCount] = useState(0)

  return (
    <MyAccessProvider>
    <div className="container">
      <Header/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/topics' element={<Topics />}></Route>
        <Route path='/addcard' element={<AddCard />}></Route>
        <Route path='/addtopic' element={<AddTopic />}></Route>
        <Route path='/topic/:id' element={<Topic />}></Route>
        <Route path='/addcard/:id' element={<AddCard />}></Route>
        <Route path='/edit' element={<Topics />}></Route>

      </Routes>
    </div>
  </MyAccessProvider>
  )
  
}

export default App