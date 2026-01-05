# Project Structure & Organization

## Root Structure
```
/
├── .kiro/              # Kiro IDE configuration
├── components/         # Reusable UI components
├── contexts/          # React Context providers
├── docs/              # Technical documentation
├── pages/             # Route components (Public + Admin)
├── services/          # Mock data và business logic
├── App.tsx            # Main app với routing setup
├── index.tsx          # Entry point
├── types.ts           # Global TypeScript interfaces
└── vite.config.ts     # Build configuration
```

## Component Organization

### `/components/`
- **Layout/**: Header, Footer, AdminLayout - layout components
- **Home/**: DonationTable, HomeBanner, NoticeBar, StatsGrid - trang chủ specific
- **Shared/**: Card, SEO - components tái sử dụng

### `/pages/`
- **Root level**: Public pages (Home, Projects, About, etc.)
- **Admin/**: Protected admin pages (Dashboard, ProjectManager, etc.)

### `/contexts/`
- **AuthContext**: Authentication state và login logic
- **DataContext**: CRUD operations cho projects, donations, volunteers
- **SiteConfigContext**: Website configuration settings

## Naming Conventions
- **Files**: PascalCase cho components (e.g., `ProjectDetail.tsx`)
- **Folders**: PascalCase cho feature folders (e.g., `components/Home/`)
- **Types**: PascalCase interfaces trong `types.ts`
- **Context**: Suffix với "Context" (e.g., `DataContext`)

## Architecture Patterns

### Routing Structure
- **Public Routes**: Wrapped trong PublicLayout (Header + Footer)
- **Admin Routes**: Protected với ProtectedRoute + AdminLayout
- **Lazy Loading**: Tất cả pages sử dụng React.lazy()

### State Management
- **Global State**: React Context API cho shared data
- **Local State**: useState cho component-specific state
- **Persistence**: LocalStorage cho mock database

### Data Flow
1. User interaction → Component
2. Component → Context method
3. Context → LocalStorage update
4. Context → Re-render affected components

## File Responsibilities
- **App.tsx**: Routing, layout logic, providers setup
- **types.ts**: Centralized TypeScript definitions
- **services/mockData.ts**: Static data và initial values
- **contexts/**: Business logic và state management