import { redirect } from 'next/navigation';
import { getCurrentUser } from '../lib/actions';
import Navbar from '../components/Navbar';
import CreateBlogForm from '../components/CreateBlogForm';

export default async function CreateBlog() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Create Your Story
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Share your expertise and insights with our global community of readers
            </p>
          </div>

          {/* Author Info Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8 animate-slide-in">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.title && `${user.title}. `}{user.name}
                </h3>
                <p className="text-gray-600">{user.specialization}</p>
                <p className="text-sm text-gray-500">📍 {user.country}</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <CreateBlogForm user={user} />

          {/* Preview Section Placeholder */}
          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Your blog will be published immediately and visible to our community of readers worldwide 🌍
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
