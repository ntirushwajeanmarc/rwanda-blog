'use client';

import { useState } from 'react';
import { login } from '../lib/actions';

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await login(formData);
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <p className="text-red-800 font-medium">{error}</p>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
          required
          disabled={isSubmitting}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing In...
          </div>
        ) : (
          '🚀 Sign In'
        )}
      </button>
    </form>
  );
}