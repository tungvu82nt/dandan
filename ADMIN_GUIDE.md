# 🔐 后台管理系统使用指南
## 长安仁爱慈善基金会 - 内容管理系统

---

## 📋 目录
1. [登录信息](#登录信息)
2. [系统架构](#系统架构)
3. [功能模块](#功能模块)
4. [访问路径](#访问路径)
5. [常见问题](#常见问题)

---

## 🔑 登录信息

### **访问地址：**
```
开发环境: http://localhost:3000/#/admin/login
生产环境: [部署后的域名]/#/admin/login
```

### **演示账号：**
```
用户名: admin
密码:   123456
```

### **认证方式：**
- 基于 LocalStorage 的 Token 认证
- Token Key: `adminToken`
- Demo Token: `demo-token`

---

## 🏗️ 系统架构

### **技术栈：**
- **Frontend:** React 18 + TypeScript
- **Routing:** React Router v6 (HashRouter)
- **State Management:** Context API
- **Form Handling:** React Hook Form
- **Styling:** Tailwind CSS
- **Icons:** Lucide React

### **Context Providers:**
```
<AuthProvider>         - 管理登录状态
  <DataProvider>       - 管理数据（项目/捐赠/志愿者）
    <SiteConfigProvider> - 管理网站配置（Banner/Footer）
```

### **Protected Routes:**
所有 `/admin/*` 路由（除了 `/admin/login`）都需要登录验证。

---

## 📊 功能模块

### **1. 概览面板 (Dashboard)**
**路径:** `/admin`  
**功能:**
- ✅ 4个统计卡片：
  - 募捐总额（元）
  - 活跃项目数
  - 待审核志愿者
  - 今日访问量（模拟）
- ✅ 待处理事项列表
- ✅ 系统信息概览

**关键组件:**
```tsx
components:
  - StatCard (统计卡片)
  - PendingTasksList (待办事项)
```

---

### **2. 项目管理 (ProjectManager)**
**路径:** `/admin/projects`  
**功能:**
- ✅ 项目列表展示（表格视图）
- ✅ 搜索项目（按标题）
- ✅ 添加新项目（Modal表单）
- ✅ 编辑项目
- ✅ 删除项目
- ✅ 查看项目详情

**数据字段:**
```typescript
Project {
  id: string;
  title: string;          // 项目标题
  category: string;       // 类别
  image: string;          // 封面图
  target: number;         // 目标金额
  raised: number;         // 已募集
  donors: number;         // 捐赠人次
  validDate: string;      // 有效期
  description: string;    // 简介
  content?: string;       // 详细内容
  status: 'active' | 'completed' | 'paused';
}
```

**操作流程:**
1. 点击"添加项目"按钮
2. 填写表单（所有字段必填）
3. 提交 → 调用 `DataContext.addProject()`
4. 数据自动保存到 LocalStorage

---

### **3. 捐赠记录 (DonationManager)**
**路径:** `/admin/donations`  
**功能:**
- ✅ 查看所有捐赠记录
- ✅ 搜索捐赠人/项目
- ✅ 统计总金额
- ✅ 导出Excel（UI预留，功能待实现）

**数据字段:**
```typescript
DonationRecord {
  id: string;
  date: string;           // 捐赠日期
  donor: string;          // 捐赠人（可匿名）
  amount: number;         // 金额
  projectTitle: string;   // 项目名称
  payType: string;        // 支付方式
  channel: string;        // 捐赠渠道
}
```

**注意事项:**
- ⚠️ 捐赠记录仅查看，不可编辑/删除
- ⚠️ 数据来源于前端用户捐赠操作

---

### **4. 志愿者管理 (VolunteerManager)**
**路径:** `/admin/volunteers`  
**功能:**
- ✅ 查看志愿者申请
- ✅ 按状态筛选（全部/待审核/已通过/已拒绝）
- ✅ 审核通过/拒绝
- ✅ 查看详细信息

**数据字段:**
```typescript
Volunteer {
  id: string;
  name: string;           // 姓名
  phone: string;          // 电话（11位）
  email: string;          // 邮箱
  area: string;           // 地区
  interest: string[];     // 服务意向
  bio: string;            // 简介
  status: 'pending' | 'approved' | 'rejected';
  date: string;           // 申请日期
}
```

**操作流程:**
1. 用户前端提交志愿者申请 → status: 'pending'
2. Admin进入志愿者管理页面
3. 点击"通过"按钮 → 调用 `updateVolunteerStatus(id, 'approved')`
4. 点击"拒绝"按钮 → status: 'rejected'

---

### **5. 系统设置 (Settings)**
**路径:** `/admin/settings`  
**功能:**
- ✅ 修改Header Banner图片
- ✅ 管理首页轮播图（添加/删除）
- ✅ 编辑Footer信息：
  - 地址
  - 电话
  - 邮箱
  - 银行账户信息
  - 技术支持
- ✅ 保存配置 → 实时生效
- ✅ 重置为默认配置

**配置字段:**
```typescript
SiteConfig {
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
```

**注意事项:**
- ⚠️ 配置保存在 LocalStorage (`siteConfig` key)
- ⚠️ 修改后前端立即生效，无需刷新
- ⚠️ 图片URL需要完整的HTTP/HTTPS地址

---

## 🌐 访问路径一览

| 功能模块 | 路径 | 说明 |
|---------|------|------|
| **登录页面** | `/admin/login` | 公开访问 |
| **概览面板** | `/admin` | 需登录 |
| **项目管理** | `/admin/projects` | 需登录 |
| **捐赠记录** | `/admin/donations` | 需登录 |
| **志愿者管理** | `/admin/volunteers` | 需登录 |
| **系统设置** | `/admin/settings` | 需登录 |

---

## 🔧 常见问题

### **Q1: 忘记密码怎么办？**
**A:** 目前是演示版本，固定账号为 `admin / 123456`。生产环境需连接后端API实现密码找回。

---

### **Q2: 如何退出登录？**
**A:** 点击侧边栏底部的"退出登录"按钮。系统会清空 `adminToken` 并跳转到登录页。

---

### **Q3: 数据保存在哪里？**
**A:** 目前所有数据保存在浏览器 LocalStorage：
- `charityData` - 项目/捐赠/志愿者数据
- `adminToken` - 登录凭证
- `siteConfig` - 网站配置

**清空方法:**
```javascript
// 打开浏览器控制台，执行：
localStorage.clear();
```

---

### **Q4: 修改配置后不生效？**
**A:** 尝试以下步骤：
1. 刷新页面（Ctrl+R）
2. 清除浏览器缓存（Ctrl+Shift+Delete）
3. 检查 LocalStorage 是否更新（F12 → Application → Local Storage）

---

### **Q5: 如何批量导入数据？**
**A:** 目前不支持批量导入。可通过以下方式手动操作：
1. 打开浏览器控制台
2. 修改 `localStorage.charityData`
3. 刷新页面

---

### **Q6: 为什么捐赠记录不能删除？**
**A:** 为保证数据透明性，捐赠记录设计为"只读"模式，不可修改或删除。这符合慈善机构信息公开的规范。

---

### **Q7: 如何添加新的管理员账号？**
**A:** 当前版本仅支持单一演示账号。若需多账号管理，需要：
1. 修改 `pages/Admin/Login.tsx` 登录逻辑
2. 连接后端用户管理API
3. 实现角色权限系统

---

## 🚀 快速开始

### **Step 1: 启动开发服务器**
```bash
npm run dev
```

### **Step 2: 打开浏览器**
```
http://localhost:3000
```

### **Step 3: 访问管理后台**
```
http://localhost:3000/#/admin/login
```

### **Step 4: 登录**
```
用户名: admin
密码:   123456
```

### **Step 5: 探索功能**
- 查看Dashboard统计
- 添加测试项目
- 审核志愿者申请
- 修改网站配置

---

## 📞 技术支持

如有任何问题，请联系技术团队：
- **Email:** tech-support@renai-changan.org
- **电话:** 029-86785588（综合办公室）

---

**最后更新:** 2026年01月05日  
**版本:** v1.0.0  
**文档维护:** 技术部
