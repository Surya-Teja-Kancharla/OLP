import { useEffect, useState } from "react";
import { fetchCourses } from "../services/courseService";
import { enrollCourse } from "../services/enrollmentService";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const data = await fetchCourses();
      setCourses(data);
    } catch (err) {
      alert("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (id) => {
    try {
      await enrollCourse(id);
      alert("Enrolled successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Already enrolled or failed");
    }
  };

  if (loading) return <p>Loading courses...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Available Courses</h2>
      {courses.length === 0 && <p>No courses available.</p>}
      <ul>
        {courses.map((course) => (
          <li key={course.id} style={{ marginBottom: "10px" }}>
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <button onClick={() => handleEnroll(course.id)}>Enroll</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
