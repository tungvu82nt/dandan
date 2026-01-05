import React from 'react';

export const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 border-b border-gray-100 pb-8">
      <div className="text-center p-4 hover:bg-gray-50 transition-colors rounded">
        <h3 className="text-3xl font-bold text-primary mb-2">5.42亿</h3>
        <p className="text-gray-500 text-sm">截止当前募捐总额</p>
      </div>
      <div className="text-center p-4 border-l border-r border-gray-100 hover:bg-gray-50 transition-colors rounded">
        <h3 className="text-3xl font-bold text-primary mb-2">4.89亿</h3>
        <p className="text-gray-500 text-sm">截止当前拨付总额</p>
      </div>
      <div className="text-center p-4 hover:bg-gray-50 transition-colors rounded">
        <h3 className="text-3xl font-bold text-primary mb-2">128万</h3>
        <p className="text-gray-500 text-sm">截止当前捐赠人次</p>
      </div>
    </div>
  );
};