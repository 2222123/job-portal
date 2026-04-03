import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext'
import UserAuthProvider from './context/UserAuthContext'
import { ClerkProvider } from '@clerk/clerk-react'

// 🔐 Clerk Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      
      {/* ✅ Router OUTSIDE is fine, but safer INSIDE Clerk */}
      <BrowserRouter>
        
        {/* ✅ Context inside Router */}
        <AppContextProvider>
          <UserAuthProvider>
            <App />
          </UserAuthProvider>
        </AppContextProvider>

      </BrowserRouter>

    </ClerkProvider>
  </React.StrictMode>
)
