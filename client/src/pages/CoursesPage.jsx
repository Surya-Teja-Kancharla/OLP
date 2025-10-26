import { useEffect, useState } from "react";
import { fetchCourses } from "../services/courseService";
import { getMyEnrollments, enrollCourse } from "../services/enrollmentService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuth();

  // ✅ Load all courses + enrollment status
  useEffect(() => {
    const loadData = async () => {
      try {
        const [allCourses, myEnrolls] = await Promise.all([
          fetchCourses(),
          getMyEnrollments(),
        ]);
        setCourses(allCourses || []);
        setEnrollments(myEnrolls?.map((e) => e.course_id) || []);
      } catch (err) {
        console.error("❌ Failed to load courses:", err);
        toast.error("Failed to load courses. Try again.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // ✅ Enroll in a course (with toasts)
  const handleEnroll = async (courseId, title) => {
    if (enrollments.includes(courseId)) {
      toast.info(`ℹ️ You’re already enrolled in "${title}"!`);
      return;
    }

    try {
      const res = await enrollCourse(courseId);
      if (res?.success) {
        toast.success(`🎉 Successfully enrolled in "${title}"!`);
        setEnrollments((prev) => [...prev, courseId]);
      } else {
        toast.error(res?.message || "Failed to enroll. Please try again.");
      }
    } catch (err) {
      console.error("Enrollment error:", err);
      toast.error("❌ Enrollment failed. Try again later.");
    }
  };

  // ✅ View or Continue course
  const handleView = (courseId, isEnrolled) => {
    navigate(`/courses/${courseId}`, { state: { enrolled: isEnrolled } });
  };

  // ✅ Loading state
  if (loading)
    return <div className="p-6 text-gray-600">Loading courses...</div>;

  // ✅ Page Layout
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">
        Available Courses
      </h1>

      {courses.length === 0 ? (
        <p className="text-gray-600">No courses available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const isEnrolled = enrollments.includes(course.id);

            return (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {course.description || "No description available"}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  {isEnrolled ? (
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                      ✓ Enrolled
                    </span>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course.id, course.title)}
                      disabled={!token}
                      className="bg-primary text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Enroll
                    </button>
                  )}

                  <button
                    onClick={() => handleView(course.id, isEnrolled)}
                    className="border border-primary text-primary text-sm px-4 py-2 rounded-md hover:bg-blue-50 transition"
                  >
                    {isEnrolled ? "Continue" : "View"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
