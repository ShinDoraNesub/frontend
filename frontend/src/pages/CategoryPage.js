import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../mock';
import { useLanguage } from '../context/LanguageContext';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const { t } = useLanguage();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setVideos(mockVideos.filter(v => v.category === categoryId));
  }, [categoryId]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
        {categoryId} {t.allVideos || 'Videos'}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
            No videos found in this category
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;