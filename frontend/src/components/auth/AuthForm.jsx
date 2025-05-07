import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

/**
 * Form component for authentication (login/register)
 */
const AuthForm = ({ type, onSuccess }) => {
  const { login, register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData.username, formData.email, formData.password);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Error message */}
      {error && (
        <div className="mb-4 p-2 bg-red-900 text-red-200 rounded text-sm">
          {error}
        </div>
      )}
      
      {/* Username field (only for registration) */}
      {type === 'register' && (
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2 focus:outline-none focus:border-primary"
            required
            minLength="3"
          />
        </div>
      )}
      
      {/* Email field */}
      <div className="mb-4">
        <label className="block text-gray-400 text-sm mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2 focus:outline-none focus:border-primary"
          required
        />
      </div>
      
      {/* Password field */}
      <div className="mb-6">
        <label className="block text-gray-400 text-sm mb-1">Password</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2 focus:outline-none focus:border-primary"
          required
          minLength="6"
        />
      </div>
      
      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-primary-dark transition"
      >
        {type === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default AuthForm;