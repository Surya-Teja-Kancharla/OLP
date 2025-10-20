import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🔹 Pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import CoursesPage from "./pages/CoursesPage";
import CourseDetails from "./pages/CourseDetails";
import EnrolledCourses from "./pages/EnrolledCourses";
import ForumPage from "./pages/ForumPage";
import QuizPage from "./pages/QuizPage";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// 🔹 Components
import PrivateRoute from "./components/auth/PrivateRoute";
import Navbar from "./components/layout/Navbar";

const AppRoutes = () => (
  <BrowserRouter>
    {/* Navbar visible on all pages */}
    <Navbar />

    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <PrivateRoute>
            <CoursesPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/courses/:id"
        element={
          <PrivateRoute>
            <CourseDetails />
          </PrivateRoute>
        }
      />

      <Route
        path="/enrolled"
        element={
          <PrivateRoute>
            <EnrolledCourses />
          </PrivateRoute>
        }
      />

      <Route
        path="/forum"
        element={
          <PrivateRoute>
            <ForumPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/quiz"
        element={
          <PrivateRoute>
            <QuizPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/instructor"
        element={
          <PrivateRoute>
            <InstructorDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      {/* Catch-all 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
