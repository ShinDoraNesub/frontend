import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Eye, Calendar, ThumbsUp, Clock } from 'lucide-react';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../mock';
import { useLanguage } from '../context/LanguageContext';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { toast } from '../hooks/use-toast';
import { addToHistory, addToWatchLater, removeFromWatchLater, isInWatchLater, toggleLike, isLiked } from '../utils/localStorage';

const WatchPage = () => {
  const { videoId } = useParams();
  const { t } = useLanguage();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [liked, setLiked] = useState(false);
  const [inWatchLater, setInWatchLater] = useState(false);

  useEffect(() => {
    const foundVideo = mockVideos.find(v => v.id === videoId);
    setVideo(foundVideo);
    
    if (foundVideo) {
      // Add to watch history
      addToHistory(foundVideo);
      
      // Check if liked or in watch later
      setLiked(isLiked(videoId));
      setInWatchLater(isInWatchLater(videoId));
      
      const related = mockVideos
        .filter(v => v.category === foundVideo.category && v.id !== videoId)
        .slice(0, 8);
      setRelatedVideos(related);
    }
  }, [videoId]);

  const handleLike = () => {
    if (video) {
      const newLikedState = toggleLike(video);
      setLiked(newLikedState);
      toast({
        title: newLikedState ? 'Added to liked videos' : 'Removed from liked videos',
        description: newLikedState ? 'Video added to your liked videos' : 'Video removed from your liked videos',
      });
    }
  };

  const handleWatchLater = () => {
    if (video) {
      if (inWatchLater) {
        removeFromWatchLater(videoId);
        setInWatchLater(false);
        toast({
          title: 'Removed from Watch Later',
          description: 'Video removed from your watch later list',
        });
      } else {
        addToWatchLater(video);
        setInWatchLater(true);
        toast({
          title: 'Added to Watch Later',
          description: 'Video added to your watch later list',
        });
      }
    }
  };

  if (!video) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 dark:text-gray-400">Video not found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {/* Video Player */}
        <Card className="border-0 bg-black rounded-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                src={video.embedUrl}
                title={video.title}
                frameBorder="0"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </CardContent>
        </Card>

        {/* Ad Space */}
        <div className="w-full h-24 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
          Ad Space
        </div>

        {/* Video Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {video.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>{video.views} {t.views || 'views'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={liked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="flex items-center gap-2"
              >
                <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                {liked ? 'Liked' : 'Like'}
              </Button>
              <Button
                variant={inWatchLater ? "default" : "outline"}
                size="sm"
                onClick={handleWatchLater}
                className="flex items-center gap-2"
              >
                <Clock className="w-4 h-4" />
                {inWatchLater ? 'Saved' : 'Watch Later'}
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/category/${video.category}`}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {video.category}
            </Link>
          </div>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                {t.description || 'Description'}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {video.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Videos */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {t.relatedVideos || 'Related Videos'}
        </h2>
        <div className="space-y-3">
          {relatedVideos.map((relatedVideo) => (
            <VideoCard key={relatedVideo.id} video={relatedVideo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;