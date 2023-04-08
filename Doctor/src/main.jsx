import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import "./assets/css/flag.css"
import { Provider } from 'react-redux'
import store from './redux/store'
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                   // css utility


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>

  </React.StrictMode>,
)
