import { useNavigate } from 'react-router-dom';

/**
 * 404 Not Found page
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-400 mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-primary rounded font-medium hover:bg-primary-dark"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFoundPage;