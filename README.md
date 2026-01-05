# Xi'an Charity Association Portal (Reconstruction) | Hội Từ thiện Tây An

Dự án tái cấu trúc cổng thông tin điện tử của Hội Từ thiện Tây An (Xi'an Charity Association) sử dụng công nghệ React hiện đại, tối ưu hóa trải nghiệm người dùng và tích hợp hệ thống quản trị nội dung (CMS) phía client.

## 🌟 Tính năng Nổi bật

### 1. Phân hệ Người dùng (Client Public)
*   **Giao diện Responsive:** Tương thích hoàn toàn với Mobile, Tablet và Desktop.
*   **Hệ thống Quyên góp:** Xem chi tiết dự án, thanh tiến độ thời gian thực, và giả lập quyên góp tích hợp.
*   **Tin tức & Truyền thông:** Phân loại tin tức (từ thiện, báo chí, quận huyện) với giao diện trực quan.
*   **Công khai Minh bạch:** Tra cứu danh sách quyên góp, báo cáo tài chính.
*   **Tình nguyện viên:** Form đăng ký tình nguyện viên với Validate dữ liệu chặt chẽ (Zod).

### 2. Phân hệ Quản trị (Admin Dashboard)
*   **Dashboard:** Biểu đồ thống kê tổng quan (Tổng tiền, số dự án, lượt truy cập).
*   **Quản lý Dự án:** Thêm, Sửa, Xóa dự án từ thiện.
*   **Quản lý Quyên góp:** Theo dõi dòng tiền thời gian thực từ người dùng đóng góp.
*   **Quản lý Tình nguyện viên:** Phê duyệt hoặc từ chối đơn đăng ký.
*   **Cấu hình Hệ thống:** Tùy chỉnh Banner trang chủ, thông tin Footer, và các liên kết mạng xã hội.
*   **📢 Quản lý Thông báo (NEW):** Thêm/sửa/xóa thông báo chạy liên tục trên thanh công bố trang chủ.

## 🛠 Công nghệ Sử dụng

*   **Core:** React 18, TypeScript, Vite.
*   **UI Framework:** Tailwind CSS (Custom Config theo Design System gốc).
*   **State Management:** React Context API (DataContext, AuthContext, SiteConfigContext).
*   **Routing:** React Router v6 (Lazy Loading).
*   **Form Handling:** React Hook Form + Zod Validation.
*   **Icons:** Lucide React.
*   **SEO:** React Helmet Async.
*   **Data Persistence:** LocalStorage (Giả lập Database).

## 🚀 Cài đặt và Chạy dự án

1.  **Clone dự án:**
    ```bash
    git clone [url-repo]
    cd xian-charity-portal
    ```

2.  **Cài đặt thư viện:**
    ```bash
    npm install
    ```

3.  **Chạy môi trường phát triển (Dev):**
    ```bash
    npm run dev
    ```
    Truy cập: `http://localhost:3000`

4.  **Tài khoản Admin Demo:**
    *   URL: `/admin/login`
    *   Username: `admin`
    *   Password: `123456`

## 📂 Cấu trúc Thư mục

```
/
├── public/              # Tài nguyên tĩnh
├── src/
│   ├── components/      # Các component tái sử dụng (Layout, Shared, Feature-specific)
│   ├── contexts/        # Logic xử lý dữ liệu toàn cục (Data, Auth, Config)
│   ├── pages/           # Các trang giao diện (Admin & Public)
│   ├── services/        # Mock data và logic giả lập API
│   ├── types/           # Định nghĩa TypeScript Interfaces
│   ├── App.tsx          # Main App & Routing
│   └── main.tsx         # Entry point
├── docs/                # Tài liệu kỹ thuật chi tiết
│   ├── NOTICE_MANAGEMENT_GUIDE.md  # 📢 Hướng dẫn quản lý thông báo
│   └── ...
└── README.md            # Hướng dẫn chung
```

Để xem chi tiết tài liệu kỹ thuật, vui lòng truy cập thư mục `docs/`.
