import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { getLikedVideos } from '../utils/localStorage';

const LikedVideosPage = () => {
  const [videos, setVideos] = useState([]);

  const loadLikedVideos = () => {
    setVideos(getLikedVideos());
  };

  useEffect(() => {
    loadLikedVideos();
    
    // Refresh when returning to this page
    const handleFocus = () => loadLikedVideos();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Liked Videos
      </h1>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>No liked videos yet</p>
          <p className="text-sm mt-2">Like videos by clicking the "Like" button on any video</p>
        </div>
      )}
    </div>
  );
};

export default LikedVideosPage;