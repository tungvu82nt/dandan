import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { SEO } from '../components/Shared/SEO';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, donations } = useData();
  const project = projects.find(p => p.id === id);
  const [donateAmount, setDonateAmount] = useState<string>('10');

  if (!project) {
    return (
      <div className="p-20 text-center">
        <SEO title="项目不存在" />
        项目不存在
      </div>
    );
  }

  const percent = typeof project.target === 'number' 
    ? Math.min(100, (project.raised / project.target) * 100).toFixed(1) 
    : '0';

  const handleDonate = () => {
      alert(`感谢您的善心！您即将捐赠 ${donateAmount} 元。\n(此功能为演示，未连接真实支付)`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <SEO title={project.title} description={project.description} />
      <div className="max-w-container mx-auto px-4 md:px-0">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-primary">首页</Link> &gt; 
            <Link to="/projects" className="hover:text-primary"> 慈善项目</Link> &gt; 
            <span className="text-gray-800"> 项目详情</span>
        </div>

        {/* Top Info Section */}
        <div className="bg-white p-6 shadow-sm mb-6 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-[450px] shrink-0">
                <img src={project.image} alt={project.title} className="w-full h-auto rounded" />
            </div>
            
            <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">{project.title}</h1>
                <div className="bg-gray-50 p-4 rounded mb-6">
                     <p className="text-gray-500 text-sm mb-2">募捐备案编号：51610100573539824XA21008</p>
                     <p className="text-gray-500 text-sm">有效期：{project.validDate}</p>
                </div>

                {/* Progress */}
                <div className="mb-6">
                    <div className="flex justify-between text-sm mb-1">
                        <span>已筹：<strong className="text-accent text-lg">￥{project.raised.toLocaleString()}</strong></span>
                        <span className="text-gray-500">目标：{typeof project.target === 'number' ? `￥${project.target.toLocaleString()}` : project.target}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-primary h-3 rounded-full transition-all duration-1000" style={{width: `${percent}%`}}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>进度: {percent}%</span>
                        <span>{project.donors} 人次参与</span>
                    </div>
                </div>

                {/* Donation Action */}
                <div className="flex items-center gap-4">
                    <div className="flex border border-gray-300 rounded overflow-hidden">
                        <span className="bg-gray-100 px-3 py-2 text-gray-500 border-r border-gray-300">￥</span>
                        <input 
                            type="number" 
                            className="w-24 px-2 focus:outline-none" 
                            value={donateAmount}
                            onChange={(e) => setDonateAmount(e.target.value)}
                        />
                    </div>
                    <button 
                        className="bg-primary text-white px-8 py-2 rounded text-lg font-bold hover:bg-secondary shadow-lg transform active:scale-95 transition-all"
                        onClick={handleDonate}
                    >
                        立即捐款
                    </button>
                </div>
            </div>
        </div>

        {/* Content & Records Tabs */}
        <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-[3] bg-white p-6 shadow-sm min-h-[400px]">
                <h3 className="text-lg font-bold border-b-2 border-primary pb-2 mb-4 w-24">项目详情</h3>
                <div className="prose max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: project.content || project.description }}></div>
                
                <div className="mt-8 bg-yellow-50 border border-yellow-100 p-4 text-sm text-yellow-800">
                    <h4 className="font-bold mb-1">温馨提示：</h4>
                    <p>西安市慈善会承诺：您的每一笔捐款都将用于该公益项目，我们将定期公示项目进展和资金使用情况。</p>
                </div>
            </div>

            <div className="flex-1 bg-white p-4 shadow-sm h-fit">
                <h3 className="text-lg font-bold border-b border-gray-200 pb-2 mb-4">爱心榜单</h3>
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                    {donations.slice(0, 10).map((d, i) => (
                        <div key={d.id} className="flex items-center justify-between text-sm border-b border-gray-50 pb-2">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                                    {d.donor[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-700">{d.donor}</p>
                                    <p className="text-xs text-gray-400">{d.date}</p>
                                </div>
                            </div>
                            <span className="text-primary font-bold">￥{d.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;