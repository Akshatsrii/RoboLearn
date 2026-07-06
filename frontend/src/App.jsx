import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/ui/Toast";
import { CartProvider } from "./context/CartContext";

// layouts
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ChatWidget from "./components/ui/ChatWidget";
import CartDrawer from "./components/cart/CartDrawer";

// public pages
import Home from "./pages/Home";
import About from "./pages/About";
import LabSetup from "./pages/LabSetup";
import Training from "./pages/Training";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Curriculum from "./pages/Curriculum";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import CaseStudies from "./pages/CaseStudies";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout";

// auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import RequireAuth from "./components/RequireAuth";

// admin
import AdminLayout from "./admin/layouts/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminBlogs from "./admin/pages/AdminBlogs";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminGallery from "./admin/pages/AdminGallery";
import AdminCourses from "./admin/pages/AdminCourses";
import AdminCaseStudies from "./admin/pages/AdminCaseStudies";
import AdminResources from "./admin/pages/AdminResources";
import AdminTestimonials from "./admin/pages/AdminTestimonials";
import AdminPartners from "./admin/pages/AdminPartners";
import AdminLeads from "./admin/pages/AdminLeads";
import ProtectedRoute from "./admin/components/ProtectedRoute";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ChatWidget />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <BrowserRouter>
              <CartDrawer />
              <Routes>
              {/* Public */}
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/lab-setup" element={<PublicLayout><LabSetup /></PublicLayout>} />
              <Route path="/training" element={<PublicLayout><Training /></PublicLayout>} />
              <Route path="/products" element={<PublicLayout><Products /></PublicLayout>} />
              <Route path="/products/:id" element={<PublicLayout><ProductDetail /></PublicLayout>} />
              <Route path="/curriculum" element={<PublicLayout><Curriculum /></PublicLayout>} />
              <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
              <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
              <Route path="/blog/:id" element={<PublicLayout><BlogDetail /></PublicLayout>} />
              <Route path="/case-studies" element={<PublicLayout><CaseStudies /></PublicLayout>} />
              <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
              <Route path="/checkout" element={<PublicLayout><Checkout /></PublicLayout>} />

              {/* Auth */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={
                <RequireAuth>
                  <PublicLayout><UserDashboard /></PublicLayout>
                </RequireAuth>
              } />

              {/* Admin */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="blogs" element={<AdminBlogs />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="case-studies" element={<AdminCaseStudies />} />
                <Route path="resources" element={<AdminResources />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="partners" element={<AdminPartners />} />
                <Route path="leads" element={<AdminLeads />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={
                <PublicLayout>
                  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-6xl font-bold text-[#0b2545] mb-4">404</h1>
                    <p className="text-slate-500 mb-6">Page not found.</p>
                    <a href="/" className="bg-[#0b2545] text-white px-6 py-3 rounded-xl font-semibold hover:bg-cyan-600 transition-colors">
                      Back to Home
                    </a>
                  </div>
                </PublicLayout>
              } />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}