import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"
import Theme from './components/common/Theme'
const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false,
    },
    
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div id="theme" className="flex justify-center my-6">
    <Theme></Theme>
    </div>
    
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </BrowserRouter>
    
  </StrictMode>,
)
