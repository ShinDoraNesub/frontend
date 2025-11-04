import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../mock';
import { useLanguage } from '../context/LanguageContext';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { t } = useLanguage();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (query) {
      const filtered = mockVideos.filter(v =>
        v.title.toLowerCase().includes(query.toLowerCase()) ||
        v.description.toLowerCase().includes(query.toLowerCase())
      );
      setVideos(filtered);
    }
  }, [query]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {t.search || 'Search'} results for: <span className="text-blue-600 dark:text-blue-400">"{query}"</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
            No videos found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;