import React from 'react';
import { mockSocialLinks, mockDonationLinks } from '../mock';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Youtube, Music2, Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {t.socialLinks || 'Follow Us'}
            </h3>
            <div className="flex gap-4">
              <a
                href={mockSocialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Music2 className="w-5 h-5" />
              </a>
              <a
                href={mockSocialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={mockSocialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Donation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              {t.donate || 'Support Us'}
            </h3>
            <div className="flex flex-wrap gap-3">
              <a
                href={mockDonationLinks.trakteer}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                <Heart className="w-4 h-4" />
                Trakteer
              </a>
              <a
                href={mockDonationLinks.saweria}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors"
              >
                <Heart className="w-4 h-4" />
                Saweria
              </a>
              <a
                href={mockDonationLinks.kofi}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <Heart className="w-4 h-4" />
                Ko-fi
              </a>
              <a
                href={mockDonationLinks.sociabuzz}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                <Heart className="w-4 h-4" />
                Sociabuzz
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 VideoHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;