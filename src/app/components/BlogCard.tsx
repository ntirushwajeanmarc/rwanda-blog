// components/BlogCard.tsx
import Link from 'next/link';
import type { Blog } from '../lib/api';

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <Link href={`/blog/${blog.id}`} className="group block animate-fade-in">
      <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600 transition-all duration-300 p-6 cursor-pointer group-hover:-translate-y-1">
        {/* Header with category badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              {blog.author.specialization || 'General'}
            </span>
            <span className="text-gray-400 dark:text-gray-500 text-xs">•</span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">{getReadingTime(blog.content)}</span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg className="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>

        {/* Title and content */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {blog.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
            {blog.content.length > 160 
              ? `${blog.content.substring(0, 160)}...` 
              : blog.content
            }
          </p>
        </div>

        {/* Author section */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
              {blog.author.name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-700"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {blog.author.title && `${blog.author.title}. `}{blog.author.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              📍 {blog.author.country}
            </p>
          </div>
        </div>

        {/* Stats and date */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {blog.likes}
            </span>
            <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              {blog.shares}
            </span>
            <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {blog.comments.length}
            </span>
          </div>
          <time className="text-gray-400 dark:text-gray-500 text-xs font-medium">
            {formatDate(blog.created_at)}
          </time>
        </div>

        {/* Hover effect gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
      </article>
    </Link>
  );
}