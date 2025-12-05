import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { PizzaProvider } from './hooks/usePizzaStore'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PizzaProvider>
      <App />
    </PizzaProvider>
  </StrictMode>,
)
