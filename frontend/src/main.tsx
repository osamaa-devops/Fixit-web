import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import '@/styles/global.css'
import App from './App.tsx'
import { queryClient } from './config/queryClient'
import { ErrorBoundary } from './components/common/ErrorBoundary'
import { ToastContainer } from './components/common/Toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <App />
        <ToastContainer />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)
