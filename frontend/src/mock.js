// Mock data for YouTube Clone

export const mockVideos = [
  {
    id: '1',
    title: 'Amazing Nature Documentary - Wildlife in 4K',
    thumbnail: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=225&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'documentary',
    views: '1.2M',
    uploadDate: '2024-01-15',
    description: 'Explore the wonders of nature in stunning 4K quality'
  },
  {
    id: '2',
    title: 'Cooking Tutorial - Perfect Pasta Recipe',
    thumbnail: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=225&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'cooking',
    views: '856K',
    uploadDate: '2024-01-20',
    description: 'Learn how to make perfect pasta from scratch'
  },
  {
    id: '3',
    title: 'Gaming Highlights - Epic Moments Compilation',
    thumbnail: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=225&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'gaming',
    views: '2.4M',
    uploadDate: '2024-01-18',
    description: 'The most epic gaming moments of the month'
  },
  {
    id: '4',
    title: 'Music Performance - Live Concert 2024',
    thumbnail: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=225&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'music',
    views: '3.1M',
    uploadDate: '2024-01-10',
    description: 'Full live concert performance'
  },
  {
    id: '5',
    title: 'Tech Review - Latest Gadgets 2024',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=225&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'technology',
    views: '1.8M',
    uploadDate: '2024-01-22',
    description: 'Review of the newest tech gadgets'
  },
  {
    id: '6',
    title: 'Travel Vlog - Exploring Japan',
    thumbnail: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=225&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'travel',
    views: '945K',
    uploadDate: '2024-01-12',
    description: 'Amazing journey through Japan'
  },
  {
    id: '7',
    title: 'Fitness Training - Full Body Workout',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=225&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'fitness',
    views: '672K',
    uploadDate: '2024-01-25',
    description: 'Complete full body workout routine'
  },
  {
    id: '8',
    title: 'Educational - Learn Web Development',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=225&fit=crop',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    category: 'education',
    views: '1.5M',
    uploadDate: '2024-01-08',
    description: 'Complete web development course'
  }
];

export const mockMainMenu = [
  { id: 'home', name: 'Home', icon: 'Home', path: '/' },
  { id: 'trending', name: 'Trending', icon: 'TrendingUp', path: '/trending' },
  { id: 'history', name: 'History', icon: 'History', path: '/history' },
  { id: 'watchlater', name: 'Watch Later', icon: 'Clock', path: '/watch-later' },
  { id: 'liked', name: 'Liked Videos', icon: 'ThumbsUp', path: '/liked' }
];

export const mockCategories = [
  { id: 'all', name: 'All', icon: 'Home' },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2' },
  { id: 'music', name: 'Music', icon: 'Music' },
  { id: 'education', name: 'Education', icon: 'GraduationCap' },
  { id: 'technology', name: 'Technology', icon: 'Laptop' },
  { id: 'cooking', name: 'Cooking', icon: 'ChefHat' },
  { id: 'travel', name: 'Travel', icon: 'Plane' },
  { id: 'fitness', name: 'Fitness', icon: 'Dumbbell' },
  { id: 'documentary', name: 'Documentary', icon: 'Film' }
];

export const mockSocialLinks = {
  tiktok: 'https://tiktok.com/@yourhandle',
  facebook: 'https://facebook.com/yourpage',
  youtube: 'https://youtube.com/@yourchannel'
};

export const mockDonationLinks = {
  trakteer: 'https://trakteer.id/yourname',
  saweria: 'https://saweria.co/yourname',
  kofi: 'https://ko-fi.com/yourname',
  sociabuzz: 'https://sociabuzz.com/yourname/donate'
};

export const mockSiteSettings = {
  logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=120&h=40&fit=crop',
  siteName: 'VideoHub',
  adScript: '<!-- Ad placeholder -->'
};