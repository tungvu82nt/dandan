import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../services/mockData';
import { useSiteConfig } from '../../contexts/SiteConfigContext';

const Header: React.FC = () => {
  const location = useLocation();
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const { config } = useSiteConfig();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="w-full bg-white">
      {/* Top Bar */}
      <div className="w-full border-b border-gray-100">
        <div className="max-w-container mx-auto flex justify-between items-center h-10 px-4 md:px-0">
          <div className="w-64 md:w-96 overflow-hidden relative h-full flex items-center">
            <div className="text-textGray text-sm absolute whitespace-nowrap animate-marquee">
              您好，欢迎来到西安市慈善会！！！
            </div>
          </div>
          <div className="text-textGray text-sm flex gap-2">
            <button className="hover:text-primary">登录</button>
            <span>|</span>
            <button className="hover:text-primary">注册</button>
          </div>
        </div>
      </div>

      {/* Banner Image */}
      <div className="w-full bg-gray-100">
        <div className="max-w-container mx-auto">
          <img 
            src={config.headerImage} 
            alt="Header Banner" 
            className="w-full h-auto object-cover max-h-[120px] md:max-h-full"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="w-full bg-primary relative z-50">
        <div className="max-w-container mx-auto">
          <ul className="flex flex-wrap md:flex-nowrap w-full">
            {NAV_ITEMS.map((item) => (
              <li 
                key={item.id} 
                className="flex-1 relative group"
                onMouseEnter={() => setHoveredMenu(item.id)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link
                  to={item.path}
                  className={`block text-center py-4 text-white text-lg transition-colors duration-300 ${
                    isActive(item.path) ? 'bg-secondary' : 'hover:bg-secondary'
                  }`}
                >
                  {item.label}
                </Link>
                
                {/* Dropdown */}
                {item.children && hoveredMenu === item.id && (
                  <ul className="absolute top-full left-0 w-full bg-white shadow-lg border-t-2 border-primary animate-fadeIn">
                    {item.children.map((child) => (
                      <li key={child.id} className="border-b border-gray-100 last:border-0">
                        <Link 
                          to={child.path}
                          className="block py-3 px-4 text-center text-gray-700 hover:text-primary hover:bg-gray-50 text-sm"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;