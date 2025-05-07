import { FiMenu, FiSearch, FiMic } from 'react-icons/fi';
import { FaYoutube } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Header component with navigation and search functionality
 */
const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authType, setAuthType] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-dark-800 px-4 py-2 flex items-center justify-between border-b border-dark-700">
      {/* Left section with menu and logo */}
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="p-2 mr-2 rounded-full hover:bg-dark-700"
        >
          <FiMenu className="text-xl" />
        </button>
        <div 
          className="flex items-center cursor-pointer"
          onClick={() => navigate('/')}
        >
          <FaYoutube className="text-primary text-3xl mr-1" />
          <span className="font-bold text-xl">YouTube</span>
        </div>
      </div>
      
      {/* Middle section with search bar */}
      <div className="hidden md:flex items-center flex-1 max-w-2xl mx-4">
        <form onSubmit={handleSearch} className="relative flex flex-1">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-dark-900 border border-dark-600 rounded-l-full px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button 
            type="submit"
            className="bg-dark-700 px-5 rounded-r-full border border-l-0 border-dark-600"
          >
            <FiSearch className="text-xl" />
          </button>
        </form>
        <button className="ml-4 p-2 bg-dark-700 rounded-full">
          <FiMic className="text-xl" />
        </button>
      </div>
      
      {/* Right section with user controls */}
      <div className="flex items-center">
        <button 
          className="p-2 mx-1 rounded-full hover:bg-dark-700 md:hidden"
          onClick={() => navigate('/search')}
        >
          <FiSearch className="text-xl" />
        </button>
        
        {user ? (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            {user.username.charAt(0).toUpperCase()}
          </div>
        ) : (
          <button 
            onClick={() => {
              setAuthType('login');
              setAuthModalOpen(true);
            }}
            className="ml-2 px-4 py-1 bg-primary rounded-full text-sm font-medium"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Authentication modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        type={authType}
        setType={setAuthType}
      />
    </header>
  );
};

export default Header;