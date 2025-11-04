import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../mock';

const TrendingPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Sort by views (trending)
    const sorted = [...mockVideos].sort((a, b) => {
      const viewsA = parseFloat(a.views.replace(/[KM]/g, '')) * (a.views.includes('M') ? 1000000 : 1000);
      const viewsB = parseFloat(b.views.replace(/[KM]/g, '')) * (b.views.includes('M') ? 1000000 : 1000);
      return viewsB - viewsA;
    });
    setVideos(sorted);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Trending
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default TrendingPage;