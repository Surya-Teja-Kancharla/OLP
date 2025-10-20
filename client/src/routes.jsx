import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentDashboard from "./pages/StudentDashboard";
import CoursesPage from "./pages/CoursesPage";
import CourseDetails from "./pages/CourseDetails";
import ForumPage from "./pages/ForumPage";
import QuizPage from "./pages/QuizPage";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import CoursePlayer from "./pages/CoursePlayer";

// Components
import PrivateRoute from "./components/auth/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Layout from "./components/layout/Layout";
import RoleRedirect from "./components/RoleRedirect";

const AppRoutes = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Role Redirect */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <RoleRedirect />
          </PrivateRoute>
        }
      />

      {/* ✅ Authenticated Routes with Layout (Sidebar + Main) */}
      <Route
        path="/student"
        element={
          <PrivateRoute>
            <Layout>
              <StudentDashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <PrivateRoute>
            <Layout>
              <CoursesPage />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/courses/:id"
        element={
          <PrivateRoute>
            <Layout>
              <CourseDetails />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/player/:courseId"
        element={
          <PrivateRoute>
            <CoursePlayer />
          </PrivateRoute>
        }
      />

      <Route
        path="/forum"
        element={
          <PrivateRoute>
            <Layout>
              <ForumPage />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/quiz"
        element={
          <PrivateRoute>
            <Layout>
              <QuizPage />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/instructor"
        element={
          <PrivateRoute>
            <Layout>
              <InstructorDashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Layout>
              <AdminDashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
