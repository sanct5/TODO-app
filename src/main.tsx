import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AppTheme } from './theme/appTheme.tsx'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppTheme>
        <App />
      </AppTheme>
    </Provider>
  </React.StrictMode>,
)