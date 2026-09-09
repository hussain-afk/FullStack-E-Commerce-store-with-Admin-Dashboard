import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import DataProvider from './context/DataApi.jsx'
import StoreProvider from './context/StoreContext.jsx'
import AdminProvider from './context/admin.context.jsx'
import './index.css'
import App from './App.jsx'
import store from './redux/index.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataProvider>
      <BrowserRouter>
        <StoreProvider>
          <AdminProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </AdminProvider>
        </StoreProvider>
      </BrowserRouter>
    </DataProvider>
  </StrictMode>,
)
