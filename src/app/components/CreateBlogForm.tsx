'use client';

import { useState } from 'react';
import { createBlog } from '../lib/actions';

interface CreateBlogFormProps {
  user: {
    name: string;
    title?: string;
    specialization?: string;
    country: string;
  };
}

export default function CreateBlogForm({ user }: CreateBlogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const result = await createBlog(formData);
      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError('Failed to create blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8 animate-scale-in">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Title Input */}
        <div className="mb-8">
          <label htmlFor="title" className="block text-lg font-semibold text-gray-900 mb-3">
            Blog Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Write a compelling title that captures your reader's attention..."
            className="w-full px-6 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
            required
            disabled={isSubmitting}
          />
          <p className="text-sm text-gray-500 mt-2">
            💡 Great titles are clear, specific, and promise value to your readers
          </p>
        </div>

        {/* Content Input */}
        <div className="mb-8">
          <label htmlFor="content" className="block text-lg font-semibold text-gray-900 mb-3">
            Your Story
          </label>
          <textarea
            id="content"
            name="content"
            rows={20}
            placeholder="Start writing your blog content here... Share your insights, experiences, and expertise with the world."
            className="w-full px-6 py-4 text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 leading-relaxed"
            required
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-3">
            <p className="text-sm text-gray-500">
              📝 Write freely - you can always edit later
            </p>
            <p className="text-sm text-gray-400">
              Minimum 100 words recommended
            </p>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
          <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
            💡 Writing Tips
          </h4>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>• Start with a hook to grab readers' attention</li>
            <li>• Use subheadings to structure your content</li>
            <li>• Include personal experiences and examples</li>
            <li>• End with a strong conclusion or call-to-action</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Publishing...
              </>
            ) : (
              <>
                🚀 Publish Blog
              </>
            )}
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-4 rounded-xl transition-all duration-200 font-semibold text-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            💾 Save Draft
          </button>
        </div>
      </div>
    </form>
  );
}