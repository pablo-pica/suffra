import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';

// Configure the browser SDK for the deployed Preprod dApp.
try {
  setNetworkId('preprod');
} catch {
  // The hook sets the network again before wallet operations.
}

// Safeguard fetch binding to window to prevent 'Illegal invocation' errors in browser WASM/SDK calls
if (typeof window !== 'undefined' && window.fetch) {
  const originalFetch = window.fetch;
  window.fetch = function (input: RequestInfo | URL, init?: RequestInit) {
    return originalFetch.call(window, input, init);
  };
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
