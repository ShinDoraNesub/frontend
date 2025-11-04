import React, { useState, useEffect } from 'react';
import VideoCard from '../components/VideoCard';
import { Button } from '../components/ui/button';
import { getHistory, clearHistory } from '../utils/localStorage';
import { toast } from '../hooks/use-toast';

const HistoryPage = () => {
  const [videos, setVideos] = useState([]);

  const loadHistory = () => {
    setVideos(getHistory());
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your watch history?')) {
      clearHistory();
      setVideos([]);
      toast({
        title: 'History cleared',
        description: 'Your watch history has been cleared',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Watch History
        </h1>
        {videos.length > 0 && (
          <Button variant="outline" onClick={handleClearHistory}>
            Clear History
          </Button>
        )}
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>No videos in your watch history</p>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;