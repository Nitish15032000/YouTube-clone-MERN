import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';

// Pages
import HomePage from './pages/HomePage';
import VideoPage from './pages/video/VideoPage';
import ChannelPage from './pages/channel/ChannelPage';
import UploadPage from './pages/video/UploadPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import SearchResultsPage from './pages/SearchResultsPage';
import ChannelCreatePage from './pages/channel/ChannelCreatePage';

/**
 * Main App component with all route definitions
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/video/:id" element={<VideoPage />} />
            <Route path="/channel/:id" element={<ChannelPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Protected Routes */}
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/channel/create" element={<ChannelCreatePage />} />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;