import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Login page component
 */
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-900 text-red-200 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-400 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-400 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-dark-700 border border-dark-600 rounded px-3 py-2"
            required
            minLength="6"
          />
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-2 bg-primary rounded font-medium hover:bg-primary-dark disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-gray-400">
        Don't have an account?{' '}
        <button 
          onClick={() => navigate('/register')}
          className="text-primary hover:underline"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;