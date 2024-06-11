import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import { NextUIProvider } from '@nextui-org/react'
import './index.css'

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
        <NextUIProvider>
          <RouterProvider router={router} />
        </NextUIProvider >
  </React.StrictMode>,
)