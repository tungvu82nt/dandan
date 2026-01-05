import React from 'react';
import { Link } from 'react-router-dom';

export const NoticeBar: React.FC = () => {
  return (
    <div className="flex items-center bg-[#ebeced] p-2 mb-6 rounded-sm">
      <div className="bg-[url('https://www.xascsh.com/static/default/static/images/ggBtg.png')] bg-no-repeat bg-center w-40 h-[60px] flex items-center justify-center text-white font-bold text-lg mr-4 shrink-0 shadow-md">
        总会公告
      </div>
      <div className="flex-1 overflow-hidden relative h-[30px] flex items-center">
        <div className="absolute whitespace-nowrap animate-marquee pause-on-hover flex gap-12 w-full">
          <Link to="/news/n1" className="text-gray-600 hover:text-primary transition-colors font-medium">📢 西安市慈善会郑重声明：谨防诈骗</Link>
          <Link to="/about" className="text-gray-600 hover:text-primary transition-colors font-medium">📢 热烈庆祝西安市慈善会成立30周年</Link>
          <Link to="/news/n2" className="text-gray-600 hover:text-primary transition-colors font-medium">📢 慈善帮扶解难忧，锦旗回馈话初心</Link>
          <Link to="/news/n1" className="text-gray-600 hover:text-primary transition-colors font-medium">📢 西安市慈善会郑重声明：谨防诈骗</Link>
        </div>
      </div>
    </div>
  );
};