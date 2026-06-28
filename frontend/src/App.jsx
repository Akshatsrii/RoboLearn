import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/ui/Toast";

// --- layouts ---
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import ChatWidget from "./components/ui/ChatWidget";

// --- public pages ---
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
import Login from "./pages/Login";
import Register from "./pages/Register";

// --- admin ---
import AdminLogin from "./admin/pages/AdminLogin";
import AdminLayout from "./admin/layouts/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminProducts from "./admin/pages/AdminProducts";
import AdminBlogs from "./admin/pages/AdminBlogs";
import AdminGallery from "./admin/pages/AdminGallery";
import AdminCourses from "./admin/pages/AdminCourses";
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
        <ToastProvider>
          <BrowserRouter>
          <Routes>
            {/* ---------- Public site ---------- */}
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

            {/* ---------- Site auth (visitors) ---------- */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ---------- Admin ---------- */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="leads" element={<AdminLeads />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
    </HelmetProvider>
  );
}