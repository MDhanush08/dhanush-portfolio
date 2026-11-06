import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Fontsource variable fonts
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';

// Global styling & design tokens
import './styles/index.css';

import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
