// app/page.tsx
import { blogAPI, type Blog } from './lib/api';
import BlogCard from './components/BlogCard';
import Navbar from './components/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BlogHub - Discover Amazing Stories & Insights',
  description: 'Join our community of expert writers and discover thought-provoking content from around the world',
};

export default async function Home() {
  let blogs: Blog[];
  let errorMessage = '';
  
  try {
    blogs = await blogAPI.getBlogs();
  } catch (err) {
    console.warn('API unavailable during build/render:', err);
    blogs = [];
    errorMessage = 'Unable to load latest posts. Please check back later.';
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-800 dark:via-purple-800 dark:to-blue-900">
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
                Discover Amazing
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Stories & Insights
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-slide-in">
                Join our community of expert writers and thought leaders sharing knowledge from around the globe
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
                <a
                  href="/create"
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  ✍️ Start Writing
                </a>
                <a
                  href="#blogs"
                  className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                >
                  📖 Explore Blogs
                </a>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-300/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/3 w-12 h-12 bg-purple-300/20 rounded-full animate-pulse"></div>
        </section>

        {/* Stats Section */}
        <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="animate-fade-in">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{blogs.length}+</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Expert Articles</div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">50K+</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Active Readers</div>
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">25+</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">Countries</div>
              </div>
            </div>
          </div>
        </section>

        {/* Blogs Section */}
        <section id="blogs" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 animate-fade-in">
                Latest Stories
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-slide-in">
                Discover insights from experts worldwide, handpicked for their quality and impact
              </p>
            </div>

                        <div className="space-y-6">
              {errorMessage && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center mb-8">
                  <div className="flex justify-center mb-3">
                    <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Service Temporarily Unavailable</h3>
                  <p className="text-yellow-700 dark:text-yellow-300">{errorMessage}</p>
                </div>
              )}

              {blogs.length === 0 && !errorMessage ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">No stories yet</h3>
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-6">Be the first to share your expertise with the community!</p>
                <a
                  href="/create"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
                >
                  ✍️ Create First Blog
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <div
                    key={blog.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <BlogCard blog={blog} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-gray-900 to-blue-900 dark:from-gray-950 dark:to-blue-950 text-white py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6 animate-fade-in">
              Ready to Share Your Story?
            </h2>
            <p className="text-xl mb-8 text-blue-100 dark:text-blue-200 animate-slide-in">
              Join thousands of writers who are making an impact with their words
            </p>
            <a
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 animate-scale-in"
            >
              🚀 Get Started Today
            </a>
          </div>
        </section>
      </main>
    </>
  );
}