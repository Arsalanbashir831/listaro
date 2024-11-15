
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import 'tailwindcss/tailwind.css';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {/* Large 404 Text */}
        <div className="text-blue-500 text-9xl font-bold">404</div>
        
        {/* Error Message */}
        <h1 className="text-3xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Sorry, the page youre looking for doesnt exist or has been moved.
        </p>
        
        {/* Home Button */}
        <Button
          type="primary"
          icon={<HomeOutlined />}
          className="mt-6"
          onClick={() => window.location.href = '/'}
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
