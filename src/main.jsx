import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Router/router.jsx'
import AuthProvider from './AuthProvider/AuthProvider.jsx'
import { ChatContextProvider } from './AuthProvider/ChatContext.jsx'
import { Toaster } from 'react-hot-toast'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
        <ChatContextProvider>
        <RouterProvider router={router}>
        </RouterProvider>
       </ChatContextProvider>
        <Toaster />
    </AuthProvider>
  </StrictMode>,
)
