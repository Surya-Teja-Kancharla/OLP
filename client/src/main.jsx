import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CourseProvider } from "./context/CourseContext";
import { ForumProvider } from "./context/ForumContext";

// Global styles
import "./index.css";

// Mount App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CourseProvider>
        <ForumProvider>
          <App />
        </ForumProvider>
      </CourseProvider>
    </AuthProvider>
  </React.StrictMode>
);
