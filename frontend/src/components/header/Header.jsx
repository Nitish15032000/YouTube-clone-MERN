import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { AiOutlineMenu, AiOutlineBell } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import logo from "/logo.png";

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const searchQueryHandler = (event) => {
    if ((event?.key === "Enter" || event === "searchButton") && searchQuery?.length > 0) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="flex justify-between fixed top-0 w-full bg-white px-6 py-2 shadow-sm z-50">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <AiOutlineMenu 
          className="text-xl cursor-pointer" 
          onClick={toggleSidebar}
        />
        <Link to="/" className="flex items-center space-x-1">
          <img src={logo} alt="Logo" className="w-28 cursor-pointer" />
        </Link>
      </div>

      {/* Center Section - Search */}
      <div className="flex w-[35%] items-center">
        <div className="w-full px-4 py-2 border border-gray-400 rounded-l-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
          />
        </div>
        <button
          className="px-4 py-2 border border-l-0 border-gray-400 bg-gray-100 rounded-r-full hover:bg-gray-200"
          onClick={() => searchQueryHandler("searchButton")}
        >
          <CiSearch size={24} />
        </button>
        <IoMdMic
          size={42}
          className="ml-3 border border-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-200 transition-all duration-200"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-5">
        {user ? (
          <>
            <RiVideoAddLine className="text-2xl cursor-pointer hover:text-gray-700" />
            <AiOutlineBell className="text-2xl cursor-pointer hover:text-gray-700" />
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={user.avatar || '/default-avatar.png'}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <Link 
            to="/auth" 
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-full hover:bg-blue-50 transition-colors"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;