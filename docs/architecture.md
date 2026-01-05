# Sơ đồ Kiến trúc Hệ thống

Tài liệu này mô tả luồng hoạt động và cấu trúc của hệ thống thông qua các biểu đồ Mermaid.

## 1. Sơ đồ Luồng Dữ liệu (Data Flow Diagram) - Quy trình Quyên góp
Mô tả cách dữ liệu di chuyển từ Người dùng Public đến Hệ thống lưu trữ và hiển thị cho Admin.

```mermaid
sequenceDiagram
    participant User as Người dùng (Public)
    participant UI as Giao diện (ProjectDetail)
    participant Context as DataContext (Logic)
    participant Storage as LocalStorage (DB)
    participant Admin as Quản trị viên (Dashboard)

    User->>UI: Nhập số tiền & Bấm "Quyên góp"
    UI->>Context: Gọi hàm addDonation(amount, project)
    
    rect rgb(240, 248, 255)
        Note right of Context: Xử lý Transaction
        Context->>Context: Tạo bản ghi Donation mới
        Context->>Context: Tìm Project tương ứng
        Context->>Context: Cập nhật Project (raised + amount)
    end
    
    Context->>Storage: Lưu mảng Donations mới
    Context->>Storage: Lưu mảng Projects mới
    
    UI-->>User: Hiển thị thông báo thành công
    UI->>UI: Cập nhật thanh tiến độ (Re-render)
    
    Admin->>Context: Xem trang Quản lý Quyên góp
    Context-->>Admin: Trả về dữ liệu mới nhất (Real-time)
```

## 2. Sơ đồ Cấu trúc Ứng dụng (Component Structure)

```mermaid
graph TD
    App[App.tsx] --> Providers
    
    subgraph Providers [Context Providers]
        Auth[AuthProvider]
        Config[SiteConfigContext]
        Data[DataProvider]
    end
    
    Providers --> Router[React Router]
    
    Router --> Public[Public Layout]
    Router --> Private[Admin Layout (Protected)]
    
    subgraph PublicPages [Public Pages]
        Home
        ProjectDetail
        NewsList
        DonatePage[TransactionList]
        VolunteerForm
    end
    
    subgraph AdminPages [Admin Pages]
        Dashboard
        ProjectMgr[Project Manager]
        DonationMgr[Donation Manager]
        Settings
    end
    
    Public --> PublicPages
    Private --> AdminPages
    
    PublicPages -.->|Read/Write| Data
    AdminPages -.->|Read/Write| Data
    AdminPages -.->|Update Config| Config
```

## 3. Sơ đồ Trạng thái Tình nguyện viên (Volunteer State Machine)

```mermaid
stateDiagram-v2
    [*] --> Pending: Người dùng gửi Form
    
    Pending --> Approved: Admin bấm "Duyệt"
    Pending --> Rejected: Admin bấm "Từ chối"
    
    Approved --> [*]: Lưu trữ hồ sơ
    Rejected --> [*]: Gửi email thông báo (Future)
    
    note right of Pending
        Dữ liệu nằm trong
        mảng volunteers
        với status='pending'
    end note
```

## 4. Kiến trúc Thư mục & Mối quan hệ

```mermaid
classDiagram
    class App {
        +Routes
    }
    
    class DataContext {
        +projects: Project[]
        +donations: DonationRecord[]
        +addDonation()
        +addProject()
    }
    
    class LocalStorage {
        key: app_projects
        key: app_donations
    }
    
    class ProjectDetail {
        +handleDonate()
    }
    
    class AdminDashboard {
        +stats
    }

    App --> DataContext : Uses
    DataContext --> LocalStorage : Persists to
    ProjectDetail --> DataContext : Consumes
    AdminDashboard --> DataContext : Consumes
```
