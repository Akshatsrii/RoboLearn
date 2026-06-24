import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--color-navy)" }}>
      <Navbar />
      <main className="flex-1 pt-[70px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;