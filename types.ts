export interface NavItem {
  id: string;
  label: string;
  path: string;
  children?: NavItem[];
}

export interface Project {
  id: string;
  title: string;
  image: string;
  raised: number;
  target: string | number; // Changed to allow calculation
  donors: number;
  validDate: string;
  description: string;
  content?: string; // HTML content for detail page
  category?: string;
  status: 'active' | 'completed' | 'pending';
}

export interface Fund {
  id: string;
  title: string;
  image: string;
  sponsor: string;
  raised: number;
  times: number;
  date: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  image?: string;
  summary: string;
  content?: string; // HTML content
  source: string;
  category: 'charity' | 'media' | 'district'; // Added for filtering
}

export interface DonationRecord {
  id: string;
  date: string;
  donor: string;
  amount: number;
  projectTitle: string;
  payType: string;
  channel: string;
}

export interface Volunteer {
  id: number;
  name: string;
  phone: string;
  email: string;
  area: string;
  interest: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface StatMetric {
  label: string;
  value: string | number;
  unit?: string;
  iconType: 'money' | 'out' | 'people';
}

// Interface cho thông báo chạy (Notice Bar)
export interface NoticeItem {
  id: string;
  content: string;
  link: string;
  icon?: string; // Emoji hoặc icon, mặc định: 📢
}