# Báo cáo Đánh giá Dự án Xi'an Charity Association Portal

## 1. Tổng quan
Dự án là một ứng dụng web Single Page Application (SPA) xây dựng bằng React, TypeScript và Vite, phục vụ mục đích quản lý và hiển thị thông tin cho Hội Từ thiện Tây An. Dự án bao gồm hai phân hệ chính: Public (cho người dùng xem tin tức, quyên góp) và Admin (quản trị hệ thống).

## 2. Đánh giá chi tiết

### 2.1. Cấu trúc và Tổ chức Dự án
*   **Điểm mạnh:**
    *   Cấu trúc thư mục rõ ràng, phân chia theo chức năng (`components`, `pages`, `contexts`, `services`).
    *   Sử dụng `vite` làm build tool giúp tốc độ phát triển nhanh.
    *   Tách biệt rõ ràng giữa Layout Admin và Public.
*   **Điểm cần cải thiện:**
    *   **Vị trí file nguồn:** Toàn bộ source code (`components`, `pages`, `contexts`, ...) đang nằm ở thư mục gốc (root) thay vì trong thư mục `src/` như quy chuẩn thông thường của Vite/React. Điều này khiến thư mục gốc bị rối và khó quản lý. `src/` hiện tại chỉ chứa `index.css`.
    *   **Cấu hình Tailwind:** File `tailwind.config.js` trỏ tới `./src/**/*.{js,ts,jsx,tsx}` nhưng file thực tế lại nằm ở root, dẫn đến nguy cơ Tailwind không quét được class nếu không cấu hình đúng hoặc tổ chức lại file.

### 2.2. Chất lượng Mã nguồn & TypeScript
*   **Điểm mạnh:**
    *   Sử dụng TypeScript cho toàn bộ dự án, giúp code an toàn hơn.
    *   Các interface trong `types.ts` được định nghĩa khá rõ ràng (`Project`, `DonationRecord`, `Volunteer`).
    *   Sử dụng `lucide-react` cho icon đồng bộ.
*   **Điểm cần cải thiện:**
    *   **Type Safety:** Vẫn còn sử dụng `any` ở một số chỗ quan trọng (ví dụ: `catch (err: any)`), nên thay bằng `unknown` hoặc type error cụ thể.
    *   **Kiểu dữ liệu nhập nhằng:** Trường `target` trong `Project` được định nghĩa là `string | number`, gây khó khăn khi tính toán (phải ép kiểu `parseFloat` nhiều lần trong code). Nên thống nhất là `number`.
    *   **Hardcoded Strings:** Toàn bộ giao diện sử dụng tiếng Trung cứng (Hardcoded Chinese), khó khăn cho việc bảo trì hoặc đa ngôn ngữ hóa sau này.

### 2.3. React Patterns & State Management
*   **Điểm mạnh:**
    *   Sử dụng **Context API** (`DataContext`, `AuthContext`) để quản lý state toàn cục là hợp lý với quy mô dự án vừa và nhỏ.
    *   Sử dụng **Custom Hooks** (`useAuth`, `useData`) giúp code trong component gọn gàng hơn.
    *   `ProjectManager.tsx` sử dụng `react-hook-form` để xử lý form, giúp code clean và performant hơn so với state truyền thống.
*   **Điểm cần cải thiện:**
    *   **Performance:** `DataContext` đang load *toàn bộ* dữ liệu (Projects, Volunteers, Donations, News...) ngay khi ứng dụng khởi chạy (`loadData` gọi tất cả API). Với dữ liệu lớn, điều này sẽ gây chậm loading ban đầu (Waterfall blocking). Nên tách nhỏ Context hoặc dùng `React Query` / `SWR` để fetch data theo nhu cầu.
    *   **Render Optimization:** Chưa thấy sử dụng `useMemo` hay `useCallback` cho các hàm xử lý hoặc tính toán nặng trong Context, có thể gây re-render không cần thiết.

### 2.4. Kiến trúc & Tính ổn định (Stability)
*   **Vấn đề nghiêm trọng (Critical Consistency Issue):**
    *   **README vs Thực tế:** `README.md` ghi là "LocalStorage (Giả lập Database)", nhưng code trong `services/api.ts` và `database/db.ts` lại sử dụng `@neondatabase/serverless` để kết nối tới một database Postgres thật thông qua SQL query.
    *   **Rủi ro bảo mật:** `AuthAPI` trong `services/api.ts` thực hiện so sánh password dạng plain-text (`user.password === password`) ngay tại client (hoặc qua query lộ liễu). Mặc dù là dự án mẫu, nhưng việc query bảng `admin_users` từ client side (nếu dùng serverless function trực tiếp từ client) là cực kỳ nguy hiểm nếu không có RLS (Row Level Security) chặt chẽ.
    *   **Mâu thuẫn logic:** Code `addDonation` trong `DataContext` cập nhật state cục bộ (`setProjects`) giả lập realtime, trong khi `api.ts` lại ghi vào DB thật. Điều này có thể gây sai lệch dữ liệu giữa Client và Server nếu không đồng bộ lại.

## 3. Đề xuất Cải tiến (Recommendations)

1.  **Refactor Cấu trúc thư mục:** Di chuyển tất cả mã nguồn (`components`, `pages`, `services`, `contexts`, `App.tsx`, `main.tsx`) vào trong thư mục `src/` để đúng chuẩn Vite và gọn gàng hơn.
2.  **Đồng bộ hóa Database Strategy:**
    *   Quyết định rõ ràng: Dùng LocalStorage (Mock) hay Neon Database (Real).
    *   Nếu dùng Mock: Viết lại `services/api.ts` để đọc/ghi vào `localStorage` thay vì gọi `sql`.
    *   Nếu dùng Real DB: Cần có backend API (ví dụ: Next.js API Routes hoặc Express) để ẩn logic kết nối DB và bảo mật credentials, thay vì gọi trực tiếp từ Client.
3.  **Tối ưu State:** Chia nhỏ `DataContext` thành các context nhỏ hơn (ví dụ: `ProjectContext`, `DonationContext`) hoặc sử dụng thư viện `TanStack Query` để quản lý server state hiệu quả hơn.
4.  **Cải thiện Type:** Định nghĩa lại `target` trong `Project` thành `number` thuần túy. Xử lý `any` triệt để hơn.
5.  **Bảo mật:** Không lưu password plain-text. Nếu demo, hãy dùng cơ chế mock auth đơn giản không dính dáng đến DB thật hoặc hash password.

## 4. Kết luận
Dự án có nền tảng code React/TypeScript khá tốt, tổ chức component rõ ràng và giao diện hiện đại. Tuy nhiên, dự án đang ở trạng thái "lai" giữa Mock và Real App gây ra mâu thuẫn lớn về kiến trúc dữ liệu và tiềm ẩn rủi ro bảo mật. Cần ưu tiên refactor cấu trúc thư mục và thống nhất phương án lưu trữ dữ liệu trước khi phát triển tiếp.
