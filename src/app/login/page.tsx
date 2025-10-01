import Link from 'next/link';
import Navbar from '../components/Navbar';
import LoginForm from '../components/LoginForm';

export default function Login() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full animate-fade-in">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-lg">
              Sign in to continue sharing your expertise
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <LoginForm />

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link 
                  href="/register" 
                  className="font-semibold text-blue-600 hover:text-purple-600 transition-colors duration-200"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl mb-2">✍️</div>
              <p className="text-sm text-gray-600 font-medium">Write & Share</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
              <div className="text-2xl mb-2">🌍</div>
              <p className="text-sm text-gray-600 font-medium">Global Reach</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
