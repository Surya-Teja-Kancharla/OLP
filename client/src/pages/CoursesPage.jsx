import { useEffect, useState } from "react";
import { fetchCourses } from "../services/courseService";
import { getMyEnrollments, enrollCourse } from "../services/enrollmentService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useAuth();

  // ✅ Load courses + enrollment status
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
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // ✅ Enroll in a course
  const handleEnroll = async (courseId) => {
    try {
      await enrollCourse(courseId);
      alert("✅ Successfully enrolled!");
      setEnrollments([...enrollments, courseId]);
    } catch (err) {
      alert("❌ Failed to enroll. Please try again.");
    }
  };

  // ✅ Go to Course Details / Player Page
  const handleView = (courseId, isEnrolled) => {
    navigate(`/courses/${courseId}`, { state: { enrolled: isEnrolled } });
  };

  // ✅ UI
  if (loading)
    return <div className="p-6 text-gray-600">Loading courses...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-primary mb-6">
        Available Courses
      </h1>

      {!Array.isArray(courses) || courses.length === 0 ? (
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
                    {course.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  {isEnrolled ? (
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                      ✓ Enrolled
                    </span>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course.id)}
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
