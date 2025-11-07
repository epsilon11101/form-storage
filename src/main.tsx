import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/App/App.tsx'
import ProvidersWrapper from './providers/ProvidersWrapper.tsx'
import { Navigate, Route } from "react-router-dom"
import Gitlab from './pages/Gitlab/Gitlab.tsx'
import MainLayout from './pages/layouts/MainLayout.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProvidersWrapper>
      <Route element={<MainLayout />}>
        <Route path="/" element={<App />} />
        <Route path="/gitlab" element={<Gitlab />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </ProvidersWrapper>
  </StrictMode >,
)
