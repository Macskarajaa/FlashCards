import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from '../context/AuthContext.jsx'
import { MyAccessProvider } from './context/MyAccessProvider.jsx'

createRoot(document.getElementById('root')).render(
  <MyAccessProvider>
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </MyAccessProvider>
)
