import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation, Link } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './pages/0.home/Home';
import About from './pages/1.about/About';
import Projects from './pages/2.projects/Projects';
import ProjectDetail from './pages/3.projectDetail/ProjectDetail';
import Gallery from './pages/4.gallery/Gallery';
import Blog from './pages/5.blog/Blog';
import BlogPost from './pages/6.blogPost/BlogPost';
import Contact from './pages/7.contact/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
      <p className="font-display text-7xl italic text-gold-600">404</p>
      <h1 className="mt-4 text-2xl">This page hasn't been built yet.</h1>
      <Link
        to="/"
        className="mt-8 rounded-md bg-forest-800 px-6 py-3 text-sm font-semibold text-white hover:bg-forest-900"
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
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
