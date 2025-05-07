import { useState } from 'react';
import AuthForm from './AuthForm';

/**
 * Modal component for authentication forms
 */
const AuthModal = ({ isOpen, onClose, type, setType }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
      <div 
        className="bg-dark-800 rounded-lg w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        
        {/* Modal title */}
        <h2 className="text-2xl font-bold mb-6">
          {type === 'login' ? 'Sign In' : 'Sign Up'}
        </h2>
        
        {/* Authentication form */}
        <AuthForm type={type} onSuccess={onClose} />
        
        {/* Toggle between login and register */}
        <div className="mt-4 text-center text-sm text-gray-400">
          {type === 'login' ? (
            <>
              Don't have an account?{' '}
              <button 
                onClick={() => setType('register')}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button 
                onClick={() => setType('login')}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;