// components/InteractionButtons.tsx
'use client';
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function InteractionButtons({ 
  blogId, 
  initialLikes, 
  initialShares 
}: { 
  blogId: number; 
  initialLikes: number; 
  initialShares: number; 
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [shares, setShares] = useState(initialShares);
  const [liking, setLiking] = useState(false);
  const [sharing, setSharing] = useState(false);

  const handleLike = async () => {
    if (liking) return;
    setLiking(true);
    
    try {
      const res = await fetch(`${API_URL}/blogs/${blogId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!res.ok) throw new Error('Failed to like blog');
      
      const data = await res.json();
      setLikes(data.likes);
    } catch (err) {
      console.error('Error liking blog:', err);
      alert('Failed to like blog. Please try again.');
    } finally {
      setLiking(false);
    }
  };

  const handleShare = async () => {
    if (sharing) return;
    setSharing(true);
    
    try {
      const res = await fetch(`${API_URL}/blogs/${blogId}/share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!res.ok) throw new Error('Failed to share blog');
      
      const data = await res.json();
      setShares(data.shares);
      
      // Copy URL to clipboard
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        alert('Blog link copied to clipboard!');
      } else {
        alert('Blog shared successfully!');
      }
    } catch (err) {
      console.error('Error sharing blog:', err);
      alert('Failed to share blog. Please try again.');
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="flex gap-4 mb-8">
      <button
        onClick={handleLike}
        disabled={liking}
        className="flex items-center gap-2 px-6 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        👍 {liking ? 'Liking...' : `Like (${likes})`}
      </button>
      <button
        onClick={handleShare}
        disabled={sharing}
        className="flex items-center gap-2 px-6 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        🔗 {sharing ? 'Sharing...' : `Share (${shares})`}
      </button>
    </div>
  );
}
