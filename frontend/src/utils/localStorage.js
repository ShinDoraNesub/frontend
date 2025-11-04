// Utility functions for managing user data in localStorage (no login required)

// Watch History
export const addToHistory = (video) => {
  try {
    const history = JSON.parse(localStorage.getItem('watchHistory') || '[]');
    // Remove if already exists
    const filtered = history.filter(v => v.id !== video.id);
    // Add to beginning
    filtered.unshift({
      ...video,
      watchedAt: new Date().toISOString()
    });
    // Keep only last 50 videos
    const limited = filtered.slice(0, 50);
    localStorage.setItem('watchHistory', JSON.stringify(limited));
  } catch (e) {
    console.error('Error adding to history:', e);
  }
};

export const getHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('watchHistory') || '[]');
  } catch (e) {
    console.error('Error getting history:', e);
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem('watchHistory');
};

// Watch Later
export const addToWatchLater = (video) => {
  try {
    const watchLater = JSON.parse(localStorage.getItem('watchLater') || '[]');
    // Check if already exists
    const exists = watchLater.some(v => v.id === video.id);
    if (!exists) {
      watchLater.push({
        ...video,
        addedAt: new Date().toISOString()
      });
      localStorage.setItem('watchLater', JSON.stringify(watchLater));
      return true;
    }
    return false;
  } catch (e) {
    console.error('Error adding to watch later:', e);
    return false;
  }
};

export const removeFromWatchLater = (videoId) => {
  try {
    const watchLater = JSON.parse(localStorage.getItem('watchLater') || '[]');
    const filtered = watchLater.filter(v => v.id !== videoId);
    localStorage.setItem('watchLater', JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.error('Error removing from watch later:', e);
    return false;
  }
};

export const getWatchLater = () => {
  try {
    return JSON.parse(localStorage.getItem('watchLater') || '[]');
  } catch (e) {
    console.error('Error getting watch later:', e);
    return [];
  }
};

export const isInWatchLater = (videoId) => {
  try {
    const watchLater = JSON.parse(localStorage.getItem('watchLater') || '[]');
    return watchLater.some(v => v.id === videoId);
  } catch (e) {
    return false;
  }
};

// Liked Videos
export const toggleLike = (video) => {
  try {
    const liked = JSON.parse(localStorage.getItem('likedVideos') || '[]');
    const index = liked.findIndex(v => v.id === video.id);
    
    if (index > -1) {
      // Unlike
      liked.splice(index, 1);
      localStorage.setItem('likedVideos', JSON.stringify(liked));
      return false;
    } else {
      // Like
      liked.push({
        ...video,
        likedAt: new Date().toISOString()
      });
      localStorage.setItem('likedVideos', JSON.stringify(liked));
      return true;
    }
  } catch (e) {
    console.error('Error toggling like:', e);
    return false;
  }
};

export const getLikedVideos = () => {
  try {
    return JSON.parse(localStorage.getItem('likedVideos') || '[]');
  } catch (e) {
    console.error('Error getting liked videos:', e);
    return [];
  }
};

export const isLiked = (videoId) => {
  try {
    const liked = JSON.parse(localStorage.getItem('likedVideos') || '[]');
    return liked.some(v => v.id === videoId);
  } catch (e) {
    return false;
  }
};
