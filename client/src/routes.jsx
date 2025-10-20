import { BrowserRouter, Routes, Route } from "react-router-dom";

// 🔹 Pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentDashboard from "./pages/StudentDashboard";
import CoursesPage from "./pages/CoursesPage";
import CourseDetails from "./pages/CourseDetails";
import CoursePlayer from "./pages/CoursePlayer";
import EnrolledCourses from "./pages/EnrolledCourses";
import ForumPage from "./pages/ForumPage";
import QuizPage from "./pages/QuizPage";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// 🔹 Components
import PrivateRoute from "./components/auth/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import RoleRedirect from "./components/RoleRedirect";

const AppRoutes = () => (
  <BrowserRouter>
    {/* ✅ Single Navbar visible globally */}
    <Navbar />

    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* 🔁 Backward-compatible alias */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <RoleRedirect />
          </PrivateRoute>
        }
      />

      {/* 🎓 Student Dashboard */}
      <Route
        path="/student"
        element={
          <PrivateRoute>
            <StudentDashboard />
          </PrivateRoute>
        }
      />

      {/* 👨‍🏫 Instructor Dashboard */}
      <Route
        path="/instructor"
        element={
          <PrivateRoute>
            <InstructorDashboard />
          </PrivateRoute>
        }
      />

      {/* 🧑‍💼 Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      {/* 📚 Courses */}
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

      {/* 🎥 Course Player */}
      <Route
        path="/player"
        element={
          <PrivateRoute>
            <CoursePlayer />
          </PrivateRoute>
        }
      />

      {/* 🎯 Enrollments */}
      <Route
        path="/enrolled"
        element={
          <PrivateRoute>
            <EnrolledCourses />
          </PrivateRoute>
        }
      />

      {/* 💬 Forum */}
      <Route
        path="/forum"
        element={
          <PrivateRoute>
            <ForumPage />
          </PrivateRoute>
        }
      />

      {/* 🧠 Quizzes */}
      <Route
        path="/quiz"
        element={
          <PrivateRoute>
            <QuizPage />
          </PrivateRoute>
        }
      />

      {/* 🚫 Catch-all (404) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
