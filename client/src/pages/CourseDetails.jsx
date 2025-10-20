import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { getMyEnrollments, enrollCourse } from "../services/enrollmentService";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [contents, setContents] = useState([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Fetch course info
        const res = await getCourseById(id);
        setCourse(res.course || res);
        setContents(res.contents || []);

        // Fetch user enrollments to check if enrolled
        const myEnrollments = await getMyEnrollments();
        const enrolledIds = myEnrollments?.map((e) => e.course_id) || [];
        setIsEnrolled(enrolledIds.includes(Number(id)));
      } catch (err) {
        console.error("Error loading course:", err);
        alert("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const handleEnroll = async () => {
    try {
      await enrollCourse(Number(id));
      alert("Enrollment successful!");
      setIsEnrolled(true);
    } catch {
      alert("Enrollment failed.");
    }
  };

  if (loading)
    return (
      <div className="p-6 pt-24 text-gray-600 text-center">
        Loading course details...
      </div>
    );

  if (!course)
    return (
      <div className="p-6 pt-24 text-gray-600 text-center">
        Course not found.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6 pt-24 pb-16">
      {/* Header */}
      <h1 className="text-2xl font-bold text-primary mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-6">{course.description}</p>

      {/* Enrollment Section */}
      {!isEnrolled ? (
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <p className="text-gray-700 mb-4">
            You’re not enrolled in this course yet.
          </p>
          <button
            onClick={handleEnroll}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Enroll to Start Learning
          </button>
        </div>
      ) : (
        <>
          {/* Course Content */}
          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Course Content
          </h2>

          {contents.length === 0 ? (
            <p className="text-gray-600">
              No content available yet for this course.
            </p>
          ) : (
            <ul className="space-y-3">
              {contents.map((c) => (
                <li
                  key={c.id}
                  className="border rounded-lg p-4 bg-white shadow-sm flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <h3 className="font-medium text-gray-800">
                      {c.title || c.url}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {c.type?.toUpperCase()}{" "}
                      {c.duration ? `• ${c.duration}` : ""}
                    </p>
                  </div>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-primary text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
                  >
                    Open
                  </a>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
