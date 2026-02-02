import React from 'react'
import { createRoot } from 'react-dom/client'

export default function App() {
  return <div>App-home</div>
}

createRoot(document.getElementById('root')).render(<App />)
