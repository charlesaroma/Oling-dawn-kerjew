import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ImageKitProvider } from '@imagekit/react'
import './index.css'
import App from './App.jsx'

const IMAGEKIT_URL_ENDPOINT = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ImageKitProvider urlEndpoint={IMAGEKIT_URL_ENDPOINT}>
      <App />
    </ImageKitProvider>
  </StrictMode>,
)
