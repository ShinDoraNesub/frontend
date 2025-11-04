import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../mock';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (category && category !== 'all') {
      setVideos(mockVideos.filter(v => v.category === category));
    } else {
      setVideos(mockVideos);
    }
  }, [category]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t.allVideos || 'All Videos'}
      </h1>
      
      {/* Ad Placeholder */}
      <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
        Ad Space
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Home;