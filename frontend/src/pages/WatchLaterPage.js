import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { getWatchLater } from '../utils/localStorage';

const WatchLaterPage = () => {
  const [videos, setVideos] = useState([]);

  const loadWatchLater = () => {
    setVideos(getWatchLater());
  };

  useEffect(() => {
    loadWatchLater();
    
    // Refresh when returning to this page
    const handleFocus = () => loadWatchLater();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Watch Later
      </h1>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>No videos in your watch later list</p>
          <p className="text-sm mt-2">Add videos by clicking the "Watch Later" button on any video</p>
        </div>
      )}
    </div>
  );
};

export default WatchLaterPage;