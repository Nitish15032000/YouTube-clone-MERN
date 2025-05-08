import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useAuth();

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-50 py-8 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow space-y-6">
        {isLogin ? (
          <>
            <Login />
            <p className="mt-2 text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Register
              </button>
            </p>
          </>
        ) : (
          <>
            <Register />
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="text-indigo-600 hover:text-indigo-500 font-medium"
              >
                Login
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;