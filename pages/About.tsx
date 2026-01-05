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
       <SEO title="机构介绍" description="西安市慈善会简介" />
       
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
                         alt="西安市慈善会公众号" 
                         className="w-40 h-40 mx-auto mb-2 border border-gray-200 p-1" 
                       />
                       <p className="text-sm font-bold text-gray-800 tracking-wider">西安市慈善会</p>
                   </div>
               </div>

               {/* Right Main Content */}
               <div className="flex-1">
                   {/* Article Header */}
                   <div className="border-b border-gray-200 pb-4 mb-8 text-center">
                       <h1 className="text-3xl font-normal text-gray-800 mb-6 tracking-wide">西安市慈善会简介</h1>
                       <div className="flex justify-center items-center gap-8 text-xs text-gray-400">
                           <span className="flex items-center gap-1">📅 2024-04-07 16:35</span>
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
                           西安市慈善会是经西安市政府批准，市民政局注资，于1997年9月26日在西安市民政局登记注册成立，是具有独立法人资格的公益性、非营利性社会团体和公募资质的慈善机构，属5A级中国社会团体组织。
                       </p>
                       <p className="indent-8 mb-6">
                           西安市慈善会现有会长1人，执行会长兼秘书长1人，副会长26人（驻会3人），慈善专员10人（驻会1人），常务理事66人，理事204人，单位会员119个，个人会员524人。西安市慈善会内设一室六部：办公室：综合协调、行政事务、财务管理等；募集部：组织动员、开展国内外公募善款善物；项目部：策划组织实施各类慈善项目；救助部：实施救助社会各类困难群体；宣传部：开展慈善公益宣传，传播慈善文化；网信部：负责官网运行管理并实施各类网络慈善活动，开展网络慈善；联络部：组织联络各类慈善机构、社会团体、爱心企业、志愿者团队开展各类慈善活动，建立健全会员、理事等档案管理工作。
                       </p>
                       <p className="indent-8 mb-6">
                           西安市慈善会自成立以来，认真贯彻落实《中华人民共和国慈善法》，以“扶贫济困、救急助难、弘扬慈善文化、助推社会和谐”为己任，设立各类基金100余个，投入善款和物资共计近8亿元，实施项目万余个，惠及人民群众500多万人次。创立了有社会影响的“春节送温暖”、“六一送关爱”、“九九送关怀”、“高考助圆梦”、“慈善便民桥”、“幸福家园工程”等多个品牌项目，受到社会广泛关注和好评。
                       </p>
                       <p className="indent-8 mb-6">
                           西安市慈善会被中华慈善总会授予“突出贡献组织奖”、“中华慈善先进机构奖”、“突出贡献项目奖”；被省民政厅、省人力资源和社会保障厅授予“慈善项目和慈善信托奖”；被省委文明办、省慈善协会授予“三秦善星奖”；被市政府授予“抗击疫情突出贡献社会组织奖”；被市民政局授予“先进基层党组织”等荣誉称号。
                       </p>
                       <p className="indent-8 mb-6">
                           欢迎各级各类组织，爱心企业、爱心人士参与西安慈善，支持西安慈善，监督西安慈善。
                       </p>
                   </div>
                   
                   <div className="mt-12 text-[16px] text-gray-800">
                       <p>爱心捐赠电话：029-88443055；029-88868053；18192168337</p>
                   </div>
               </div>
           </div>
       </div>
    </div>
  );
};

export default About;