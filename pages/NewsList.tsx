import React from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { NEWS } from '../services/mockData';

const NewsList: React.FC = () => {
  const { category } = useParams<{ category?: string }>();
  
  const getCategoryTitle = (cat?: string) => {
      switch(cat) {
          case 'charity': return '慈善资讯';
          case 'media': return '媒体报道';
          case 'district': return '区县动态';
          default: return '新闻中心';
      }
  };

  const filteredNews = category 
    ? NEWS.filter(n => n.category === category)
    : NEWS;

  return (
    <div className="bg-white py-8 min-h-screen">
       <div className="max-w-container mx-auto px-4 md:px-0">
          <div className="w-full h-[150px] bg-gray-100 mb-8 flex items-center justify-center border-b-4 border-primary">
            <h1 className="text-3xl text-gray-800 font-bold">{getCategoryTitle(category)}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar Menu */}
              <div className="w-full md:w-64 shrink-0">
                   <div className="bg-white border border-gray-200">
                       <h3 className="bg-primary text-white p-3 font-bold text-center">新闻中心</h3>
                       <ul>
                           <li><Link to="/news/charity" className={`block p-3 border-b border-gray-100 hover:bg-gray-50 hover:text-primary ${category==='charity'?'text-primary font-bold':''}`}>慈善资讯</Link></li>
                           <li><Link to="/news/media" className={`block p-3 border-b border-gray-100 hover:bg-gray-50 hover:text-primary ${category==='media'?'text-primary font-bold':''}`}>媒体报道</Link></li>
                           <li><Link to="/news/district" className={`block p-3 border-b border-gray-100 hover:bg-gray-50 hover:text-primary ${category==='district'?'text-primary font-bold':''}`}>区县动态</Link></li>
                       </ul>
                   </div>
              </div>

              {/* List */}
              <div className="flex-1">
                  <ul className="space-y-6">
                      {filteredNews.map(news => (
                          <li key={news.id} className="flex flex-col md:flex-row gap-4 border-b border-gray-100 pb-6">
                              <div className="w-full md:w-48 h-32 shrink-0">
                                  <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1">
                                  <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-primary">
                                      <Link to={`/news/detail/${news.id}`}>{news.title}</Link>
                                  </h3>
                                  <p className="text-gray-500 text-sm line-clamp-2 mb-2">{news.summary}</p>
                                  <div className="text-xs text-gray-400 flex justify-between">
                                      <span>来源：{news.source}</span>
                                      <span>{news.date}</span>
                                  </div>
                              </div>
                          </li>
                      ))}
                  </ul>
                  {filteredNews.length === 0 && <div className="text-center py-10 text-gray-400">暂无内容</div>}
              </div>
          </div>
       </div>
    </div>
  );
};

export default NewsList;