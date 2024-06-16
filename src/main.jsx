import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/pages/App.jsx'
import './index.scss'
import { MyDataProvider } from './components/servises/context.jsx' //внести в app
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    

    
    <BrowserRouter>
      <MyDataProvider>
        <App />
      </MyDataProvider>
    </BrowserRouter>

  </React.StrictMode>,
)
