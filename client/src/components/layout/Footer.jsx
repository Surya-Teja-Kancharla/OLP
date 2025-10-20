import React from "react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="text-white text-lg font-bold">TCS</div>
          <div className="text-sm text-gray-300">©2025 TATA Consultancy Services Limited</div>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
          <a className="hover:underline">Privacy Notice</a>
          <a className="hover:underline">Cookie Policy</a>
          <a className="hover:underline">Accessibility Declaration</a>
          <a className="hover:underline">Disclaimer</a>
          <a className="hover:underline">Security Policy</a>
        </div>

        <div className="flex gap-3">
          {/* social icons placeholder, keep links */}
          <a className="text-gray-300 hover:text-white">f</a>
          <a className="text-gray-300 hover:text-white">yt</a>
          <a className="text-gray-300 hover:text-white">ig</a>
          <a className="text-gray-300 hover:text-white">in</a>
        </div>
      </div>
    </footer>
  );
}
