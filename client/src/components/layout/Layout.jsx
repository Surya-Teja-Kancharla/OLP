// src/components/layout/Layout.jsx
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navbar takes fixed position above — we push content below using mt-16 */}
      <div className="flex flex-col md:flex-row mt-16">
        {/* Sidebar (responsive: hidden on mobile, visible on md and above) */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)]">
          <main className="flex-1 px-4 sm:px-6 py-8 overflow-y-auto">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
