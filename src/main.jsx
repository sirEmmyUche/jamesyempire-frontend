import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import UseToastContainer from './hooks/use_toast.jsx'

const query = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={query}> 
      <App/>
      <UseToastContainer/>
    </QueryClientProvider>
  </StrictMode>,
)
