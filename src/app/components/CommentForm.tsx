// components/CommentForm.tsx
'use client';
import { useState } from 'react';
import { createComment } from '../lib/actions';
import { useRouter } from 'next/navigation';

export default function CommentForm({ blogId, isLoggedIn }: { blogId: number; isLoggedIn: boolean }) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    setLoading(true);
    const result = await createComment(blogId, comment);
    setLoading(false);

    if (result?.error) {
      alert(result.error);
    } else {
      setComment('');
      router.refresh();
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center border border-transparent dark:border-gray-700 transition-colors">
        <p className="text-gray-600 dark:text-gray-300">Please login to comment</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        rows={3}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}