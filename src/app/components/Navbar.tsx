// components/Navbar.tsx
import Link from 'next/link';
import { getCurrentUser } from '../lib/actions';
import LogoutButton from './LougoutButton';
import ThemeToggle from './ThemeToggle';

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
              BlogHub
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium"
            >
              Discover
            </Link>
            {user ? (
              <>
                <Link 
                  href="/create" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
                >
                  ✍️ Create Blog
                </Link>
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {user.title && `${user.title}. `}{user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.country}</p>
                  </div>
                </div>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
