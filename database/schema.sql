-- =============================================
-- Database Schema for 长安仁爱慈善基金会
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- 1. PROJECTS TABLE (慈善项目)
-- =============================================
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  image TEXT,
  raised DECIMAL(12, 2) DEFAULT 0,
  target DECIMAL(12, 2) NOT NULL,
  donors INTEGER DEFAULT 0,
  valid_date VARCHAR(100),
  category VARCHAR(50), -- 'activity', 'aid', 'elderly', etc.
  description TEXT,
  content TEXT, -- HTML content
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'pending'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 2. FUNDS TABLE (公益基金)
-- =============================================
CREATE TABLE funds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  image TEXT,
  sponsor VARCHAR(255) NOT NULL,
  raised DECIMAL(12, 2) DEFAULT 0,
  times INTEGER DEFAULT 0, -- donation times
  created_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 3. NEWS TABLE (新闻资讯)
-- =============================================
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  publish_date DATE NOT NULL,
  image TEXT,
  summary TEXT,
  content TEXT, -- HTML content
  source VARCHAR(100),
  category VARCHAR(50), -- 'charity', 'media', 'district'
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 4. DONATIONS TABLE (捐赠记录)
-- =============================================
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_name VARCHAR(100) NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  project_title VARCHAR(255), -- Cached for display
  pay_type VARCHAR(50), -- '微信', '支付宝', '银联', '转账'
  channel VARCHAR(50), -- '官网', '微信', 'App', 'Wap', '线下'
  donation_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 5. VOLUNTEERS TABLE (志愿者)
-- =============================================
CREATE TABLE volunteers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  area VARCHAR(100), -- 区域
  interest VARCHAR(255), -- 兴趣领域
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  registration_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 6. SITE_CONFIG TABLE (网站配置)
-- =============================================
CREATE TABLE site_config (
  id SERIAL PRIMARY KEY,
  config_key VARCHAR(100) UNIQUE NOT NULL,
  config_value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 7. NOTICES TABLE (公告通知)
-- =============================================
CREATE TABLE notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  link VARCHAR(255) NOT NULL,
  icon VARCHAR(10) DEFAULT '📢',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- 8. ADMIN_USERS TABLE (管理员)
-- =============================================
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL, -- bcrypt hash
  email VARCHAR(100),
  role VARCHAR(20) DEFAULT 'admin', -- 'admin', 'editor'
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =============================================
-- INDEXES for Performance
-- =============================================
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_news_category ON news(category);
CREATE INDEX idx_news_publish_date ON news(publish_date DESC);
CREATE INDEX idx_donations_date ON donations(donation_date DESC);
CREATE INDEX idx_donations_project ON donations(project_id);
CREATE INDEX idx_volunteers_status ON volunteers(status);
CREATE INDEX idx_notices_active ON notices(is_active, display_order);

-- =============================================
-- UPDATE TRIGGERS (auto update updated_at)
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_funds_updated_at BEFORE UPDATE ON funds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteers_updated_at BEFORE UPDATE ON volunteers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notices_updated_at BEFORE UPDATE ON notices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- AUTO UPDATE PROJECT STATS ON DONATION
-- =============================================
CREATE OR REPLACE FUNCTION update_project_stats_on_donation()
RETURNS TRIGGER AS $$
BEGIN
  -- Cập nhật project khi có donation mới
  IF NEW.project_id IS NOT NULL THEN
    UPDATE projects 
    SET 
      raised = raised + NEW.amount,
      donors = donors + 1
    WHERE id = NEW.project_id;
  END IF;
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_update_project_stats 
AFTER INSERT ON donations
  FOR EACH ROW EXECUTE FUNCTION update_project_stats_on_donation();
