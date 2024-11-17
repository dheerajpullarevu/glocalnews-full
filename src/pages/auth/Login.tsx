import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PhoneAuth from '../../components/auth/PhoneAuth';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  // If user is already logged in, redirect to intended destination or home
  if (user) {
    const from = (location.state as any)?.from?.pathname || '/';
    navigate(from, { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to Glocal News
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Get personalized news updates and more
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <PhoneAuth />
        </div>
      </div>
    </div>
  );
}