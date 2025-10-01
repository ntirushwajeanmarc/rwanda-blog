// app/blog/[id]/page.tsx
import { blogAPI } from '../../lib/api';
import { getCurrentUser } from '../../lib/actions';
import Navbar from '../../components/Navbar';
import BackButton from '../../components/BackButton';
import InteractionButtons from '../../components/InteractionButtons';
import CommentForm from '../../components/CommentForm';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const blog = await blogAPI.getBlog(Number(id));
  
  return {
    title: `${blog.title} | BlogHub`,
    description: blog.content.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.content.substring(0, 160),
      type: 'article',
      authors: [blog.author.name],
    },
  };
}

export default async function BlogDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const blog = await blogAPI.getBlog(Number(id));
  const user = await getCurrentUser();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
        {/* Back button */}
        <div className="max-w-4xl mx-auto px-4 pt-8">
          <BackButton className="mb-6" />
        </div>

        <article className="max-w-4xl mx-auto px-4 pb-12">
          {/* Hero section */}
          <div className="bg-white dark:bg-gray-900/80 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden mb-8 animate-fade-in transition-colors">
            {/* Category badge */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                  {blog.author.specialization || 'Article'}
                </span>
                <span className="text-blue-100">•</span>
                <span className="text-blue-100 text-sm">{getReadingTime(blog.content)}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                {blog.title}
              </h1>
            </div>

            {/* Author section */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 transition-colors">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {blog.author.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {blog.author.title && `${blog.author.title}. `}{blog.author.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {blog.author.specialization}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    📍 {blog.author.country} • Published {formatDate(blog.created_at)}
                  </p>
                </div>
                <div className="hidden sm:block text-right">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Share this article</p>
                  <div className="flex gap-2 mt-1">
                    <button className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-100">
                <div 
                  className="leading-relaxed whitespace-pre-wrap"
                  style={{ fontSize: '1.125rem', lineHeight: '1.8' }}
                >
                  {blog.content}
                </div>
              </div>
            </div>

            {/* Interaction buttons */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 transition-colors">
              <InteractionButtons 
                blogId={blog.id} 
                initialLikes={blog.likes} 
                initialShares={blog.shares} 
              />
            </div>
          </div>

          {/* Comments section */}
          <section className="bg-white dark:bg-gray-900/80 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 animate-slide-in transition-colors">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                💬 Comments ({blog.comments.length})
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Join the conversation
              </div>
            </div>
            
            <CommentForm blogId={blog.id} isLoggedIn={!!user} />

            <div className="mt-8 space-y-6">
              {blog.comments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-300 text-lg">No comments yet</p>
                  <p className="text-gray-400 dark:text-gray-500">Be the first to share your thoughts!</p>
                </div>
              ) : (
                blog.comments.map((comment, index) => (
                  <div 
                    key={comment.id} 
                    className="bg-gray-50 dark:bg-gray-800/80 rounded-xl p-6 animate-fade-in transition-colors"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {comment.author.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {comment.author.title && `${comment.author.title}. `}{comment.author.name}
                          </p>
                          <span className="text-gray-400 dark:text-gray-500">•</span>
                          <time className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(comment.created_at)}
                          </time>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </article>
      </div>
    </>
  );
}