import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { enrollCourse } from "../services/enrollmentService";
import { useAuth } from "../context/AuthContext";

export default function CourseDetails() {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadDetails();
    // eslint-disable-next-line
  }, [id]);

  const loadDetails = async () => {
    try {
      setLoading(true);
      const res = await getCourseById(id);
      // our backend returned { course, contents } per controller
      const payload = res;
      setCourseData(payload.course || payload);
      setContents(payload.contents || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load course details");
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!user) return alert("Please login to enroll");
    try {
      await enrollCourse(Number(id));
      alert("Enrolled successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to enroll");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!courseData) return <p>Course not found.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{courseData.title}</h2>
      <p>{courseData.description}</p>
      <p>
        Category: <b>{courseData.category}</b>
      </p>
      <p>Instructor: {courseData.instructor_name || courseData.instructor_id}</p>

      <div style={{ marginTop: 12 }}>
        <button onClick={handleEnroll}>Enroll</button>
      </div>

      <hr />

      <h3>Lessons / Resources</h3>
      {contents.length === 0 && <p>No content yet.</p>}
      <ul>
        {contents.map((c) => (
          <li key={c.id}>
            <div>
              <strong>{c.title || c.url}</strong> ({c.type})
            </div>
            {c.url && (
              <div>
                <a href={c.url} target="_blank" rel="noreferrer">
                  Open resource
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
