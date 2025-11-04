import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { mockCategories, mockMainMenu } from '../mock';
import { useLanguage } from '../context/LanguageContext';
import * as Icons from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const location = useLocation();

  const getIcon = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent className="w-5 h-5" /> : <Icons.Home className="w-5 h-5" />;
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <ScrollArea className="h-full">
          <div className="p-4 space-y-1">
            {/* Main Menu */}
            {mockMainMenu.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group ${
                  isActive(item.path)
                    ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className={`transition-colors ${
                  isActive(item.path)
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                }`}>
                  {getIcon(item.icon)}
                </span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            <Separator className="my-4" />

            {/* Categories */}
            <h3 className="px-3 mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t.categories || 'Categories'}
            </h3>
            {mockCategories.map((category) => (
              <Link
                key={category.id}
                to={category.id === 'all' ? '/' : `/category/${category.id}`}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors group"
              >
                <span className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {getIcon(category.icon)}
                </span>
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;