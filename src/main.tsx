import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "nes.css/css/nes.min.css";
import './index.css'
import SocialMedia from './components/SocialMedia';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <SocialMedia/>
  </React.StrictMode>
)
