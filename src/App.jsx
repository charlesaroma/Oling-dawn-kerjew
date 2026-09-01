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
    <div className="flex min-h-screen items-center justify-center gap-3 bg-surface-alt text-sm text-ink-900/50">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-900/15 border-t-gold-500" />
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

/* Dark like every other page top — the navbar rides transparent until you
   scroll, so a light background here would leave it invisible. */
function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-ink-900 px-6 py-32 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(60vw,520px)] w-[min(60vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{ background: 'radial-gradient(circle, rgba(223,161,38,0.14) 0%, transparent 66%)' }}
      />
      <p className="relative font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bronze-400">
        Error 404
      </p>
      <h1 className="relative mt-6 max-w-[16ch] font-display text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.02] tracking-[-0.02em] text-surface text-balance">
        This page hasn&apos;t been built yet.
      </h1>
      <p className="relative mt-5 max-w-[42ch] leading-relaxed text-surface/60">
        The link may be old, or the page may still be in progress. Everything else is a click away.
      </p>
      <Link
        to="/"
        className="relative mt-9 inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-semibold text-ink-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400"
      >
        Back to home
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
            <Shell />
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
