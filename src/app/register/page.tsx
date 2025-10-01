// app/register/page.tsx
import Link from 'next/link';
import Navbar from '../components/Navbar';
import RegisterForm from '../components/RegisterForm';

export default function Register() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4 transition-colors">
        <div className="max-w-3xl mx-auto animate-fade-in">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Join Our Community
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Connect with experts worldwide and share your knowledge with a global audience
            </p>
          </div>

          {/* Registration Form */}
          <div className="bg-white dark:bg-gray-900/80 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 transition-colors">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Create Your Account</h2>
              <p className="text-gray-600 dark:text-gray-400">Start your journey as a thought leader today</p>
            </div>

            <RegisterForm />

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Expert Authors</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Join professionals from 25+ countries</p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
              <div className="text-3xl mb-2">🌟</div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Quality Content</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Share insights that matter</p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:border-gray-700 transition-colors">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Global Network</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Connect with like-minded experts</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
