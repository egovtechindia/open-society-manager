import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App.jsx';
import './index.css'; // This is the new line you are adding

// Your BrowserRouter code might also be here, which is fine.
// Example:
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);