import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as Sentry from "@sentry/react";
import './index.css'
import App from './App.tsx'

Sentry.init({
  dsn: "https://26de7068b429df2e32c8ea43d88a546a@o4511000822611968.ingest.us.sentry.io/4511254995861504",
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", /^https:\/\/my-app-backend\.internetgdl\.workers\.dev/],
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
