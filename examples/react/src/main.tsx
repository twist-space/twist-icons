import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { mountedTwistIconsStyles } from '@twist-space/react-icons'

mountedTwistIconsStyles()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
