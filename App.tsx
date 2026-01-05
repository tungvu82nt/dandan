import React, { useEffect, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SiteConfigProvider } from './contexts/SiteConfigContext';
import { DataProvider } from './contexts/DataContext';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AdminLayout from './components/Layout/AdminLayout';

// Lazy Load Pages - Public
const Home = React.lazy(() => import('./pages/Home'));
const Projects = React.lazy(() => import('./pages/Projects'));
const ProjectDetail = React.lazy(() => import('./pages/ProjectDetail'));
const TransactionList = React.lazy(() => import('./pages/TransactionList'));
const NewsList = React.lazy(() => import('./pages/NewsList'));
const NewsDetail = React.lazy(() => import('./pages/NewsDetail'));
const FundsList = React.lazy(() => import('./pages/FundsList'));
const About = React.lazy(() => import('./pages/About'));
const Volunteer = React.lazy(() => import('./pages/Volunteer'));

// Lazy Load Pages - Admin
const AdminLogin = React.lazy(() => import('./pages/Admin/Login'));
const AdminDashboard = React.lazy(() => import('./pages/Admin/Dashboard'));
const AdminProjectManager = React.lazy(() => import('./pages/Admin/ProjectManager'));
const AdminSettings = React.lazy(() => import('./pages/Admin/Settings'));
const AdminDonationManager = React.lazy(() => import('./pages/Admin/DonationManager'));
const AdminVolunteerManager = React.lazy(() => import('./pages/Admin/VolunteerManager'));

// Loading Fallback Component
const LoadingSpinner = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout Wrapper for Public Pages (Header + Footer)
const PublicLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
           <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/info/transactions" element={<TransactionList />} />
              <Route path="/info/download" element={<div className="p-20 text-center text-gray-500">暂无资料下载</div>} />
              <Route path="/info/*" element={<div className="p-20 text-center text-gray-500">此栏目正在建设中...</div>} />
              <Route path="/news" element={<NewsList />} />
              <Route path="/news/:category" element={<NewsList />} />
              <Route path="/news/detail/:id" element={<NewsDetail />} />
              <Route path="/funds" element={<FundsList />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/about" element={<About />} />
              <Route path="/stories" element={<NewsList />} />
              <Route path="*" element={<Navigate to="/" replace />} />
           </Routes>
        </Suspense>
      </main>
      <Footer />
      {/* Fixed Right Sidebar (Back to Top) */}
      <div className="fixed right-4 bottom-20 z-50 hidden md:flex flex-col gap-2">
        <button className="w-12 h-12 bg-primary text-white rounded shadow-lg flex items-center justify-center text-xs hover:bg-secondary">
          捐赠
        </button>
        <button 
          className="w-12 h-12 bg-gray-600 text-white rounded shadow-lg flex items-center justify-center hover:bg-gray-700"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          TOP
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <SiteConfigProvider>
        <DataProvider>
          <AuthProvider>
            <Router>
              <ScrollToTop />
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/login" element={
                  <Suspense fallback={<LoadingSpinner />}><AdminLogin /></Suspense>
                } />
                
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Suspense fallback={<LoadingSpinner />}><AdminDashboard /></Suspense>} />
                  <Route path="projects" element={<Suspense fallback={<LoadingSpinner />}><AdminProjectManager /></Suspense>} />
                  <Route path="donations" element={<Suspense fallback={<LoadingSpinner />}><AdminDonationManager /></Suspense>} />
                  <Route path="volunteers" element={<Suspense fallback={<LoadingSpinner />}><AdminVolunteerManager /></Suspense>} />
                  <Route path="settings" element={<Suspense fallback={<LoadingSpinner />}><AdminSettings /></Suspense>} />
                  <Route path="*" element={<div className="p-10 text-gray-500">功能开发中...</div>} />
                </Route>

                {/* Public Routes */}
                <Route path="/*" element={<PublicLayout />} />
              </Routes>
            </Router>
          </AuthProvider>
        </DataProvider>
      </SiteConfigProvider>
    </HelmetProvider>
  );
};

export default App;