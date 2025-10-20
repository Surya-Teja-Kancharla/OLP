import { useEffect, useState } from "react";
import { getMyEnrollments } from "../services/enrollmentService";

export default function EnrolledCourses() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      const data = await getMyEnrollments();
      setEnrollments(data);
    } catch (err) {
      alert("Failed to load enrollments");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>My Enrolled Courses</h2>
      {enrollments.length === 0 && <p>No enrolled courses yet.</p>}
      <ul>
        {enrollments.map((item) => (
          <li key={item.id}>
            <h4>{item.title}</h4>
            <p>Progress: {item.progress}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
