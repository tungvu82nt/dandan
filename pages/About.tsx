import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/Shared/SEO';
import { Share2 } from 'lucide-react';

const About: React.FC = () => {
  // Sidebar menu structure based on the image
  const menuItems = [
    { label: '本会简介', active: true },
    { label: '机构章程', active: false },
    { label: '组织架构', active: false },
    { label: '领导成员', active: false },
    { label: '理事成员', active: false },
    { label: '管理办法', active: false },
    { label: '机构资质', active: false },
    { label: '机构荣誉', active: false },
    { label: '捐赠方式', active: false },
  ];

  return (
    <div className="bg-white min-h-screen pb-12">
       <SEO title="机构介绍" description="长安仁爱慈善基金会简介" />
       
       <div className="max-w-container mx-auto px-4 md:px-0 py-8">
           <div className="flex flex-col md:flex-row gap-8">
               
               {/* Left Sidebar */}
               <div className="w-full md:w-64 shrink-0">
                   {/* Menu Section */}
                   <div className="bg-white mb-6">
                       <h2 className="text-xl font-normal text-[#ca231e] p-4 border-b border-gray-200 flex items-center tracking-wide">
                           <span className="mr-2 text-lg">→</span> 机构介绍
                       </h2>
                       <ul className="text-sm text-gray-600">
                           {menuItems.map((item, idx) => (
                               <li key={idx} className="border-b border-gray-100 last:border-0">
                                   <Link 
                                     to="#" 
                                     className={`block py-3 px-8 transition-colors text-center ${
                                       item.active 
                                       ? 'bg-[#f47f7c] text-white' 
                                       : 'hover:text-[#ca231e] hover:bg-gray-50'
                                     }`}
                                   >
                                       {item.label}
                                   </Link>
                               </li>
                           ))}
                       </ul>
                   </div>

                   {/* QR Code Section */}
                   <div className="p-4 text-center">
                       <img 
                         src="https://res-img.n.gongyibao.cn/uploads/1dbdc970-d95e-45a8-859b-86e4e9abe89e/20210825/248ac00189d845b09a8470fd7cf8e806.png" 
                         alt="长安仁爱慈善基金会公众号" 
                         className="w-40 h-40 mx-auto mb-2 border border-gray-200 p-1" 
                       />
                       <p className="text-sm font-bold text-gray-800 tracking-wider">长安仁爱慈善基金会</p>
                   </div>
               </div>

               {/* Right Main Content */}
               <div className="flex-1">
                   {/* Article Header */}
                   <div className="border-b border-gray-200 pb-4 mb-8 text-center">
                       <h1 className="text-3xl font-normal text-gray-800 mb-6 tracking-wide">长安仁爱慈善基金会简介</h1>
                       <div className="flex justify-center items-center gap-8 text-xs text-gray-400">
                           <span className="flex items-center gap-1">📅 2026-01-05 12:00</span>
                           <span>来源：本站</span>
                           <div className="flex gap-2 items-center">
                               {/* Mock Share Icons using simple colored squares to mimic the image */}
                               <span className="w-4 h-4 bg-[#4c8bd1] rounded-sm cursor-pointer flex items-center justify-center text-white text-[10px] font-bold">+</span>
                               <span className="w-4 h-4 bg-[#ea5d5c] rounded-sm cursor-pointer"></span>
                               <span className="w-4 h-4 bg-[#69ce45] rounded-sm cursor-pointer"></span>
                               <span className="w-4 h-4 bg-[#f6c236] rounded-sm cursor-pointer"></span>
                               <span className="w-4 h-4 bg-[#4a9ae9] rounded-sm cursor-pointer"></span>
                               <span className="w-4 h-4 bg-[#54b9ea] rounded-sm cursor-pointer"></span>
                               <span className="w-4 h-4 bg-[#49c5bb] rounded-sm cursor-pointer"></span>
                           </div>
                       </div>
                   </div>

                   {/* Article Content */}
                   <div className="prose max-w-none text-gray-800 text-justify leading-9 text-[16px]">
                       <p className="indent-8 mb-6">
                           长安仁爱慈善基金会是经陕西省民政部门批准，于1999年10月26日正式注册成立的非营利性社会组织，具有独立法人资格和公开募捐资质。基金会总部设立于西安市莲湖区长安文化遗产大厦五层，是中国西北地区少数获得民政系统4A+等级评定的慈善机构之一。
                       </p>
                       <p className="indent-8 mb-6">
                           长安仁爱慈善基金会现设理事会15名成员，由长安历史与文化研究领域的学者、国家级及地方级非遗传承人、具备社会影响力的本地企业家组成。基金会内设综合办公室（行政与财务）、项目与救助部、传播与科技部三大职能部门，负责预算管控、项目统筹、新媒体运营等工作。
                       </p>
                       <p className="indent-8 mb-6">
                           基金会自成立以来，始终秉持"系统性开展人道救助与欠发达地区教育支持，长期致力于长安文化遗产的保护、传承与社会化延续"的宗旨使命，累计募集善款超过2.33亿元人民币，项目实际支出约2.06亿元，资金使用率达88%，累计捐赠人次超过20万。创立了"文化传承奖学金计划"、"长安英烈致敬计划"、"盛夏关怀行动"等多个具有社会影响力的品牌项目。
                       </p>
                       <p className="indent-8 mb-6">
                           长安仁爱慈善基金会不仅是公益执行者，更是长安精神与文化价值的守护者。基金会坚持财务透明、依法合规、内部治理与风险控制达到国家级优良标准，持续稳定运作超过二十五年，在慈善领域树立了良好的社会信用。
                       </p>
                       <p className="indent-8 mb-6">
                           欢迎各级各类组织，爱心企业、爱心人士参与长安慈善，支持长安慈善，监督长安慈善。
                       </p>
                   </div>
                   
                   <div className="mt-12 text-[16px] text-gray-800">
                       <p>爱心捐赠电话：029-86785588；029-86785599；400-8888-520</p>
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
};

export default About;