import React, { createContext, useContext, useState, useEffect } from 'react';
import { NoticeItem, SiteConfig } from '../types';

// Default values (The original hardcoded values)
const DEFAULT_CONFIG: SiteConfig = {
  headerImage: "https://res-img.n.gongyibao.cn/uploads/1dbdc970-d95e-45a8-859b-86e4e9abe89e/20240516/baba08128b1845d5866db0a8ed417d1f.jpg",
  banners: [
    "https://res-img.n.gongyibao.cn/uploads/1dbdc970-d95e-45a8-859b-86e4e9abe89e/20240506/96b897d2aff44edbb2441f5de3146b68.jpg",
    "https://picsum.photos/1200/400?random=101",
    "https://picsum.photos/1200/400?random=102"
  ],
  notices: [
    { id: '1', content: '长安仁爱慈善基金会郑重声明：谨防诈骗', link: '/news/n1', icon: '📢' },
    { id: '2', content: '热烈庆祝长安仁爱慈善基金会持续运营超过25周年', link: '/about', icon: '📢' },
    { id: '3', content: '慈善帮扶解难忧，锦旗回馈话初心', link: '/news/n2', icon: '📢' }
  ],
  footer: {
    address: "陕西省西安市莲湖区长安文化遗产大厦五层",
    phone: "029-86785588",
    email: "info@renai-changan.org",
    bankName: "浦发银行长安支行",
    bankAccount: "62150178900000256",
    bankUnit: "长安仁爱慈善基金会",
    techSupport: "北京厚普聚益科技有限公司"
  },
  baseStats: {
    raised: 542000000,
    distributed: 489000000,
    donors: 1280000
  }
};

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: SiteConfig) => void;
  resetConfig: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | null>(null);

import { SiteConfigAPI } from '../services/api';

// ... (keep usage of DEFAULT_CONFIG)

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);

  // Load from Database on mount
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const remoteConfig = await SiteConfigAPI.getConfig();
        if (remoteConfig) {
          setConfig(remoteConfig);
        }
      } catch (error) {
        console.error("Failed to load site config from DB", error);
        // Fallback or just use defaults
      }
    };
    loadConfig();
  }, []);

  const updateConfig = async (newConfig: SiteConfig) => {
    try {
      // Optimistic update
      setConfig(newConfig);
      await SiteConfigAPI.updateConfig(newConfig);
    } catch (error) {
      console.error("Failed to save config to DB", error);
    }
  };

  const resetConfig = async () => {
    try {
      setConfig(DEFAULT_CONFIG);
      await SiteConfigAPI.updateConfig(DEFAULT_CONFIG);
    } catch (error) {
      console.error("Failed to reset config", error);
    }
  };

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
};