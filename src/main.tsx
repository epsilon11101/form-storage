import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ProvidersWrapper from './providers/ProvidersWrapper.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProvidersWrapper>
      <App />
    </ProvidersWrapper>
  </StrictMode>,
)
