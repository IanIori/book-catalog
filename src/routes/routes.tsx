import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/home'
import React from 'react'

const router = createBrowserRouter([
  {path: '/', element: <Home />},
])

export default router