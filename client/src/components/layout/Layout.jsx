// src/components/layout/Layout.jsx
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {/* push whole flex layout BELOW the fixed navbar (mt-16 = 4rem = 64px) */}
      <div className="flex mt-16">
        {/* Sidebar (hidden on mobile) */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-h-[calc(100vh-4rem)]">
          <main className="flex-1 px-6 py-8 overflow-y-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
