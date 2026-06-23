import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import LabSetup from "../pages/LabSetup/LabSetup";
import Training from "../pages/Training/Training";
import Products from "../pages/Products/Products";
import Curriculum from "../pages/Curriculum/Curriculum";
import Gallery from "../pages/Gallery/Gallery";
import Blog from "../pages/Blog/Blog";
import Contact from "../pages/Contact/Contact";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/lab-setup" element={<LabSetup />} />
      <Route path="/training" element={<Training />} />
      <Route path="/products" element={<Products />} />
      <Route path="/curriculum" element={<Curriculum />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;