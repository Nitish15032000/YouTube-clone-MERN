import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import ChannelPage from './pages/ChannelPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './context/AuthContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 pt-16 min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        }`}>
          <div className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/video/:id" element={<VideoPage />} />
              <Route path="/channel/:id" element={<ChannelPage />} />
              <Route 
                path="/auth" 
                element={user ? <Navigate to="/" replace /> : <LoginPage />} 
              />
              <Route 
                path="/create-channel" 
                element={
                  user ? (
                    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
                      <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        Create Your Channel
                      </h1>
                      {/* Channel creation form would go here */}
                    </div>
                  ) : (
                    <Navigate to="/auth" state={{ from: '/create-channel' }} replace />
                  )
                } 
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;