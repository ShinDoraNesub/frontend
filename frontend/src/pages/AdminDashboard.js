import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2, LogOut, Settings, Video, Folder } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from '../hooks/use-toast';
import { mockVideos, mockCategories, mockSocialLinks, mockDonationLinks, mockSiteSettings } from '../mock';

const AdminDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [videoForm, setVideoForm] = useState({
    title: '',
    embedUrl: '',
    thumbnail: '',
    category: '',
    description: '',
  });

  useEffect(() => {
    // Check authentication
    if (sessionStorage.getItem('adminAuth') !== 'true') {
      navigate('/admin');
      return;
    }

    setVideos(mockVideos);
    setCategories(mockCategories.filter(c => c.id !== 'all'));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  const handleAddVideo = () => {
    setEditingVideo(null);
    setVideoForm({
      title: '',
      embedUrl: '',
      thumbnail: '',
      category: '',
      description: '',
    });
    setIsVideoDialogOpen(true);
  };

  const handleEditVideo = (video) => {
    setEditingVideo(video);
    setVideoForm({
      title: video.title,
      embedUrl: video.embedUrl,
      thumbnail: video.thumbnail,
      category: video.category,
      description: video.description,
    });
    setIsVideoDialogOpen(true);
  };

  const handleSaveVideo = () => {
    if (editingVideo) {
      // Update existing video
      toast({
        title: 'Video updated',
        description: 'Video has been updated successfully',
      });
    } else {
      // Add new video
      toast({
        title: 'Video added',
        description: 'New video has been added successfully',
      });
    }
    setIsVideoDialogOpen(false);
  };

  const handleDeleteVideo = (videoId) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      toast({
        title: 'Video deleted',
        description: 'Video has been deleted successfully',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Admin Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t.adminPanel || 'Admin Panel'}
          </h1>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            {t.logout || 'Logout'}
          </Button>
        </div>
      </div>

      <div className="p-6">
        <Tabs defaultValue="videos" className="space-y-6">
          <TabsList>
            <TabsTrigger value="videos">
              <Video className="w-4 h-4 mr-2" />
              {t.manageVideos || 'Manage Videos'}
            </TabsTrigger>
            <TabsTrigger value="categories">
              <Folder className="w-4 h-4 mr-2" />
              {t.manageCategories || 'Manage Categories'}
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              {t.siteSettings || 'Site Settings'}
            </TabsTrigger>
          </TabsList>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t.manageVideos || 'Manage Videos'}
              </h2>
              <Button onClick={handleAddVideo}>
                <Plus className="w-4 h-4 mr-2" />
                {t.addVideo || 'Add Video'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => (
                <Card key={video.id}>
                  <CardContent className="p-4">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-gray-900 dark:text-white">
                      {video.title}
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditVideo(video)}
                        className="flex-1"
                      >
                        <Pencil className="w-3 h-3 mr-1" />
                        {t.edit || 'Edit'}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteVideo(video.id)}
                        className="flex-1"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        {t.delete || 'Delete'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {t.manageCategories || 'Manage Categories'}
              </h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          ID: {category.id}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t.siteSettings || 'Site Settings'}
            </h2>

            <div className="space-y-6">
              {/* Logo Settings */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Logo Settings</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Logo URL
                    </label>
                    <Input defaultValue={mockSiteSettings.logo} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Site Name
                    </label>
                    <Input defaultValue={mockSiteSettings.siteName} />
                  </div>
                  <Button>Save Logo Settings</Button>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Social Media Links</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">TikTok</label>
                    <Input defaultValue={mockSocialLinks.tiktok} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Facebook</label>
                    <Input defaultValue={mockSocialLinks.facebook} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">YouTube</label>
                    <Input defaultValue={mockSocialLinks.youtube} />
                  </div>
                  <Button>Save Social Links</Button>
                </CardContent>
              </Card>

              {/* Donation Links */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Donation Links</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Trakteer</label>
                    <Input defaultValue={mockDonationLinks.trakteer} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Saweria</label>
                    <Input defaultValue={mockDonationLinks.saweria} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Ko-fi</label>
                    <Input defaultValue={mockDonationLinks.kofi} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Sociabuzz</label>
                    <Input defaultValue={mockDonationLinks.sociabuzz} />
                  </div>
                  <Button>Save Donation Links</Button>
                </CardContent>
              </Card>

              {/* Ad Settings */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ad Settings</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Ad Script/Code
                    </label>
                    <Textarea
                      rows={6}
                      defaultValue={mockSiteSettings.adScript}
                      placeholder="Paste your ad script here"
                    />
                  </div>
                  <Button>Save Ad Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Video Dialog */}
      <Dialog open={isVideoDialogOpen} onOpenChange={setIsVideoDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingVideo ? (t.editVideo || 'Edit Video') : (t.addVideo || 'Add Video')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t.videoTitle || 'Video Title'}
              </label>
              <Input
                value={videoForm.title}
                onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                placeholder="Enter video title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t.embedUrl || 'Embed URL'}
              </label>
              <Input
                value={videoForm.embedUrl}
                onChange={(e) => setVideoForm({ ...videoForm, embedUrl: e.target.value })}
                placeholder="https://drive.gdriveplayer.my.id/v/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t.thumbnail || 'Thumbnail URL'}
              </label>
              <Input
                value={videoForm.thumbnail}
                onChange={(e) => setVideoForm({ ...videoForm, thumbnail: e.target.value })}
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t.category || 'Category'}
              </label>
              <select
                value={videoForm.category}
                onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {t.description || 'Description'}
              </label>
              <Textarea
                value={videoForm.description}
                onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                placeholder="Enter video description"
                rows={4}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSaveVideo} className="flex-1">
                {t.save || 'Save'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsVideoDialogOpen(false)}
                className="flex-1"
              >
                {t.cancel || 'Cancel'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;