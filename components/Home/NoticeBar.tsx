import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../../contexts/SiteConfigContext';

/**
 * NoticeBar Component - Thanh thông báo chạy liên tục
 * Hiển thị các thông báo từ Admin Settings, lặp lại liên tục
 */
export const NoticeBar: React.FC = () => {
  const { config } = useSiteConfig();
  
  // Fallback nếu notices chưa tồn tại trong LocalStorage cũ
  const notices = config.notices || [];
  
  // Lặp lại mảng notices để tạo hiệu ứng chạy liên tục mượt mà
  const repeatedNotices = [...notices, ...notices];

  return (
    <div className="flex items-center bg-[#ebeced] p-2 mb-6 rounded-sm">
      <div className="bg-[url('https://www.xascsh.com/static/default/static/images/ggBtg.png')] bg-no-repeat bg-center w-40 h-[60px] flex items-center justify-center text-white font-bold text-lg mr-4 shrink-0 shadow-md">
        总会公告
      </div>
      <div className="flex-1 overflow-hidden relative h-[30px] flex items-center">
        <div className="absolute whitespace-nowrap animate-marquee pause-on-hover flex gap-12 w-full">
          {repeatedNotices.map((notice, index) => (
            <Link 
              key={`${notice.id}-${index}`}
              to={notice.link} 
              className="text-gray-600 hover:text-primary transition-colors font-medium"
            >
              {notice.icon || '📢'} {notice.content}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};