import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const VideoCard = ({ video }) => {
  const formatViews = (views) => {
    return views;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString();
  };

  return (
    <Link to={`/watch/${video.id}`} className="group">
      <Card className="border-0 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300">
        <CardContent className="p-0">
          <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {video.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{formatViews(video.views)}</span>
              </div>
              <span>•</span>
              <span>{formatDate(video.uploadDate)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VideoCard;