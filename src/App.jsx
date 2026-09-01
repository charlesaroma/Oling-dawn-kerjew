import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { UploadProvider } from './dashboard/3.gallery/contexts/UploadContext';
import { getSession } from './services/authService';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/1.home/Home';
import About from './pages/2.about/About';
import Projects from './pages/3.projects/Projects';
import ProjectDetail from './pages/4.projectDetail/ProjectDetail';
import Gallery from './pages/5.gallery/Gallery';
import Blog from './pages/6.blog/Blog';
import BlogPost from './pages/7.blogPost/BlogPost';
import Contact from './pages/8.contact/Contact';

/*
  The login screen and the whole admin dashboard pull in heavy
  staff-only dependencies (formik, yup, @tanstack/react-table, jspdf) —
  code-split them out of the public bundle so site visitors never
  download any of it.
*/
const Login = lazy(() => import('./pages/0.auth/Login'));
const DashboardLayout = lazy(() => import('./dashboard/components/DashboardLayout'));
const DashboardHome = lazy(() => import('./dashboard/0.overview/DashboardHome'));
const ProfileList = lazy(() => import('./dashboard/1.profiles/ProfileList'));
const ProjectList = lazy(() => import('./dashboard/2.projects/ProjectList'));
const MediaLibrary = lazy(() => import('./dashboard/3.gallery/MediaLibrary'));
const BlogPostList = lazy(() => import('./dashboard/4.blog/BlogPostList'));
const TeamList = lazy(() => import('./dashboard/5.team/TeamList'));
const SiteSettings = lazy(() => import('./dashboard/6.settings/SiteSettings'));
const SearchResults = lazy(() => import('./dashboard/7.search/SearchResults'));

function DashboardLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-3 bg-surface-alt text-sm text-navy-900/50">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-900/15 border-t-gold-500" />
      Loading…
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function ProtectedRoute({ children }) {
  if (!getSession()) return <Navigate to="/login" replace />;
  return children;
}

function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function NotFound() {
  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center overflow-hidden px-6 py-32 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-300/15 blur-3xl" />
      <p className="relative font-display text-8xl italic text-gold-600">404</p>
      <h1 className="relative mt-4 text-2xl">This page hasn't been built yet.</h1>
      <Link
        to="/"
        className="relative mt-8 inline-flex items-center gap-2 rounded-xl bg-forest-800 px-6 py-3 text-sm font-semibold text-white shadow-elevated transition-all duration-200 hover:-translate-y-0.5 hover:bg-forest-900 hover:shadow-elevated-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}

function Shell() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public site */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Auth — full screen, no navbar/footer */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<DashboardLoading />}>
              <Login />
            </Suspense>
          }
        />

        {/* Admin dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UploadProvider>
                <Suspense fallback={<DashboardLoading />}>
                  <DashboardLayout />
                </Suspense>
              </UploadProvider>
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="profiles" element={<ProfileList />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="gallery" element={<MediaLibrary />} />
          <Route path="blog" element={<BlogPostList />} />
          <Route path="team" element={<TeamList />} />
          <Route path="settings" element={<SiteSettings />} />
          <Route path="search" element={<SearchResults />} />
        </Route>
      </Routes>
    </>
  );
}

// Instantiated at the true root — public pages now need TanStack Query too
// (Projects/Blog/Team/SiteConfig/Gallery all fetch live backend data), so
// this can no longer be scoped to just the lazy-loaded dashboard bundle.
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <AdminProvider>
              <Shell />
            </AdminProvider>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
