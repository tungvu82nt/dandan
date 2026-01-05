import { Project, Fund, NewsItem, DonationRecord, NavItem, Volunteer } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: '首页', path: '/' },
  { 
    id: 'info', label: '信息公开', path: '/info',
    children: [
      { id: 'i1', label: '网络资料下载', path: '/info/download' },
      { id: 'i2', label: '财务工作报告', path: '/info/financial' },
      { id: 'i3', label: '年度工作报告', path: '/info/annual' },
      { id: 'i4', label: '收支明细', path: '/info/transactions' },
    ]
  },
  { 
    id: 'news', label: '新闻中心', path: '/news',
    children: [
      { id: 'n1', label: '慈善资讯', path: '/news/charity' },
      { id: 'n2', label: '媒体报道', path: '/news/media' },
      { id: 'n3', label: '区县动态', path: '/news/district' },
    ]
  },
  { id: 'projects', label: '慈善项目', path: '/projects' },
  { id: 'funds', label: '公益基金', path: '/funds' },
  { id: 'volunteer', label: '志愿服务', path: '/volunteer' },
  { id: 'about', label: '机构介绍', path: '/about' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: '"中华慈善日"慈善市集义卖活动',
    image: 'https://picsum.photos/800/600?random=1',
    raised: 2964.04,
    target: 500000,
    donors: 41,
    validDate: '2025-09-08至2025-10-31',
    category: 'activity',
    description: '在每个社区，集中开展为期一天的"慈善服务日"，并围绕核心需求，再开展5场不同主题的专场服务',
    content: '<p>为了庆祝中华慈善日，我们将举行大型义卖活动。所有收益将用于支持社区孤寡老人。活动现场将有志愿者提供的各类手工艺品、爱心企业捐赠的物资等。</p><p>我们诚挚邀请广大市民朋友参与，献出一份爱心。</p>',
    status: 'active'
  },
  {
    id: '2',
    title: '致敬英雄，爱心传递--为见义勇为英雄李静毅家庭募捐',
    image: 'https://picsum.photos/800/600?random=2',
    raised: 57402.86,
    target: 3000000,
    donors: 911,
    validDate: '2025-07-29至2025-10-29',
    category: 'aid',
    description: '我们呼吁全市爱心企业、社会各界人士伸出援手，汇聚爱心暖流，给予这个英雄家庭最及时、最有力的支持。',
    content: '<p>英雄流血不流泪。李静毅同志在危难时刻挺身而出，保护了人民群众的生命财产安全，自己却身负重伤。</p><p>目前，巨额的医疗费用让这个本就不富裕的家庭雪上加霜。每一份捐款都是对正义的弘扬，对英雄的致敬。</p>',
    status: 'active'
  },
  {
    id: '3',
    title: '爱心同行盛夏送凉',
    image: 'https://picsum.photos/800/600?random=3',
    raised: 930.02,
    target: 1444444,
    donors: 19,
    validDate: '2025-06-06至2025-10-31',
    category: 'aid',
    description: '为弱困群体、困难家庭、户外一线工作者提供必需生活物资，保障其基本生存需求。',
    content: '<p>炎炎夏日，当我们享受空调的清凉时，还有许多户外工作者顶着烈日坚守岗位。</p><p>本项目旨在购买防暑降温物资（绿豆、白糖、矿泉水、毛巾等），发放给环卫工人、交警、快递小哥等一线劳动者。</p>',
    status: 'active'
  },
  {
    id: '4',
    title: '爱满夕阳红，共筑幸福餐',
    image: 'https://picsum.photos/800/600?random=4',
    raised: 2765.69,
    target: 5000000,
    donors: 70,
    validDate: '2024-10-11至2025-10-31',
    category: 'elderly',
    description: '社区老年餐厅作为解决老年人就餐问题的重要设施，其重要性日益凸显。',
    content: '<p>针对独居、高龄、失能老人"做饭难、吃饭难"的问题，我们发起此项目，资助社区建立老年助餐点。</p><p>每捐助10元，就能让一位老人吃上一顿热乎乎的爱心午餐。</p>',
    status: 'active'
  }
];

export const FUNDS: Fund[] = [
  {
    id: 'f1',
    title: '长安文化传承奖学金公益基金',
    image: 'https://picsum.photos/400/300?random=5',
    sponsor: '长安仁爱慈善基金会',
    raised: 56413.48,
    times: 105,
    date: '2025-06-06'
  },
  {
    id: 'f2',
    title: '长安英烈致敬计划专项基金',
    image: 'https://picsum.photos/400/300?random=6',
    sponsor: '长安仁爱慈善基金会',
    raised: 21932.00,
    times: 17,
    date: '2025-05-22'
  },
  {
    id: 'f3',
    title: '长安盛夏关怀行动微基金',
    image: 'https://picsum.photos/400/300?random=7',
    sponsor: '长安仁爱慈善基金会',
    raised: 46.00,
    times: 8,
    date: '2025-05-14'
  },
   {
    id: 'f4',
    title: '西安慈善教育专项基金',
    image: 'https://picsum.photos/400/300?random=8',
    sponsor: '西安市教育局',
    raised: 120000.00,
    times: 300,
    date: '2025-04-10'
  }
];

export const NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: '长安仁爱慈善基金会郑重声明',
    date: '2022-04-08',
    image: 'https://picsum.photos/300/200?random=10',
    summary: '本会在这里郑重提示，凡在本会互联网平台或利用本会财务号诱导捐款者刷单、下载第三方软件等捐款，都属欺骗行为。',
    content: '<p>近期发现有不法分子冒用长安仁爱慈善基金会名义进行诈骗...</p><p>我们郑重声明：长安仁爱慈善基金会从未组织任何形式的"刷单返利"活动。</p>',
    source: '本站',
    category: 'charity'
  },
  {
    id: 'n2',
    title: '慈善帮扶解难忧，锦旗回馈话初心',
    date: '2025-12-31',
    image: 'https://picsum.photos/300/200?random=11',
    summary: '一面承载着感恩之情的锦旗被郑重递上，一群特殊的访客——困难群众代表、志愿者代表齐聚于西安慈善慈善会。',
    content: '<p>2025年12月31日，未央区几位受助群众代表来到市慈善会，送上了一面写有"扶贫济困，大爱无疆"的锦旗。</p>',
    source: '本站',
    category: 'district'
  },
  {
    id: 'n3',
    title: '暖聚初心迎冬至 慈善同心聚情长',
    date: '2025-12-22',
    image: 'https://picsum.photos/300/200?random=12',
    summary: '在冬至即将来临之际，为传承弘扬中华优秀传统文化，进一步增强团队凝聚力与向心力。',
    content: '<p>冬至大如年。为了让孤寡老人感受到节日的温暖，市慈善会组织志愿者开展了包饺子送温暖活动。</p>',
    source: '本站',
    category: 'charity'
  },
  {
    id: 'n4',
    title: '陕西日报：长安慈善事业高质量发展纪实',
    date: '2025-11-15',
    image: 'https://picsum.photos/300/200?random=13',
    summary: '陕西日报头版刊登长篇通讯，报道长安仁爱慈善基金会近年来在文化传承、人道救助方面的突出贡献。',
    content: '<p>（陕西日报讯）近年来，长安仁爱慈善基金会坚持党建引领，广泛动员社会力量...</p>',
    source: '陕西日报',
    category: 'media'
  },
  {
    id: 'n5',
    title: '高陵区慈善会开展"九九重阳"慰问活动',
    date: '2025-10-09',
    image: 'https://picsum.photos/300/200?random=14',
    summary: '重阳节当天，高陵区慈善会深入敬老院，为百岁老人送去慰问金和过冬衣物。',
    content: '<p>尊老爱幼是中华民族的传统美德...</p>',
    source: '高陵分会',
    category: 'district'
  }
];

export const DONATIONS: DonationRecord[] = [
  { id: '1', date: '2025-01-01', donor: '爱心人士', amount: 100, projectTitle: '助学项目', payType: '微信', channel: '官网' },
  { id: '2', date: '2025-01-01', donor: '张**', amount: 500, projectTitle: '抗震救灾', payType: '支付宝', channel: '微信' },
  { id: '3', date: '2025-01-02', donor: '李**', amount: 200, projectTitle: '社区服务', payType: '微信', channel: 'App' },
  { id: '4', date: '2025-01-02', donor: '王**', amount: 1000, projectTitle: '医疗救助', payType: '银联', channel: '官网' },
  { id: '5', date: '2025-01-03', donor: '爱心企业', amount: 50000, projectTitle: '乡村振兴', payType: '转账', channel: '线下' },
  { id: '6', date: '2025-01-04', donor: '赵**', amount: 50, projectTitle: '助学项目', payType: '微信', channel: '官网' },
  { id: '7', date: '2025-01-05', donor: '陈**', amount: 300, projectTitle: '医疗救助', payType: '支付宝', channel: 'Wap' },
  { id: '8', date: '2025-01-06', donor: '匿名', amount: 10000, projectTitle: '非定向捐赠', payType: '转账', channel: '线下' },
];

export const VOLUNTEERS: Volunteer[] = [
    { id: 1, name: '王小明', phone: '13800138000', email: 'wang@example.com', area: '未央区', interest: '社区服务', status: 'pending', date: '2025-02-20' },
    { id: 2, name: '李华', phone: '13912345678', email: 'lihua@example.com', area: '雁塔区', interest: '支教助学', status: 'approved', date: '2025-02-18' },
    { id: 3, name: '张伟', phone: '13788889999', email: 'zhang@example.com', area: '碑林区', interest: '扶老助残', status: 'pending', date: '2025-02-22' },
];