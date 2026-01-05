import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the shape of our configuration
export interface SiteConfig {
  headerImage: string;
  banners: string[];
  footer: {
    address: string;
    phone: string;
    email: string;
    bankName: string;
    bankAccount: string;
    bankUnit: string;
    techSupport: string;
  }
}

// Default values (The original hardcoded values)
const DEFAULT_CONFIG: SiteConfig = {
  headerImage: "https://res-img.n.gongyibao.cn/uploads/1dbdc970-d95e-45a8-859b-86e4e9abe89e/20240516/baba08128b1845d5866db0a8ed417d1f.jpg",
  banners: [
    "https://res-img.n.gongyibao.cn/uploads/1dbdc970-d95e-45a8-859b-86e4e9abe89e/20240506/96b897d2aff44edbb2441f5de3146b68.jpg",
    "https://picsum.photos/1200/400?random=101",
    "https://picsum.photos/1200/400?random=102"
  ],
  footer: {
    address: "西安慈善大厦9层（未央区凤城四路105号）",
    phone: "029-88443055",
    email: "641457472@qq.com",
    bankName: "浦发银行西安文景路支行",
    bankAccount: "72130154800000128",
    bankUnit: "西安市慈善会",
    techSupport: "北京厚普聚益科技有限公司"
  }
};

interface SiteConfigContextType {
  config: SiteConfig;
  updateConfig: (newConfig: SiteConfig) => void;
  resetConfig: () => void;
}

const SiteConfigContext = createContext<SiteConfigContextType | null>(null);

export const SiteConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);

  // Load from localStorage on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('siteConfig');
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Failed to parse site config", e);
      }
    }
  }, []);

  const updateConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    localStorage.setItem('siteConfig', JSON.stringify(newConfig));
  };

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    localStorage.setItem('siteConfig', JSON.stringify(DEFAULT_CONFIG));
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