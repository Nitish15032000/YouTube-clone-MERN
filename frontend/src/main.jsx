import { StrictMode, React} from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import App from './App.jsx'
import './index.css';

// Create root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
      {/* Provide authentication context to entire app */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
);