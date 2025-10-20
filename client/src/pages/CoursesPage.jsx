import { useEffect, useState } from "react";
import { fetchCourses } from "../services/courseService";
import { enrollCourse } from "../services/enrollmentService";
import CourseCard from "../components/courses/CourseCard";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then(setCourses);
  }, []);

  const handleEnroll = async (id) => {
    try {
      await enrollCourse(id);
      alert("Enrolled successfully!");
    } catch {
      alert("Enrollment failed or already enrolled.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Available Courses</h2>
      {courses.length === 0 ? (
        <p className="text-gray-500">No courses available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} onEnroll={handleEnroll} />
          ))}
        </div>
      )}
    </div>
  );
}
