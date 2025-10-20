import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { markLessonComplete } from "../services/playerService";
import { getMyEnrollments } from "../services/enrollmentService";

export default function CoursePlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch course data and enrollment status
  useEffect(() => {
    const loadData = async () => {
      try {
        const [courseData, myEnrolls] = await Promise.all([
          getCourseById(courseId),
          getMyEnrollments(),
        ]);

        setCourse(courseData);
        setLessons(courseData.contents || []);

        const enrolledIds = myEnrolls.map((e) => e.course_id);
        setIsEnrolled(enrolledIds.includes(Number(courseId)));
      } catch (err) {
        console.error("Failed to load course:", err);
        alert("Failed to load course data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [courseId]);

  // ✅ Format YouTube / Drive URLs for embedding
  const formatVideoUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtube.com/watch?v=")) {
      const id = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("drive.google.com/file/d/")) {
      const id = url.split("/d/")[1]?.split("/")[0];
      return `https://drive.google.com/file/d/${id}/preview`;
    }
    return url;
  };

  // ✅ Handle lesson completion
  const handleLessonComplete = async (lessonId) => {
    try {
      const res = await markLessonComplete(lessonId);
      if (!res.success) throw new Error();

      setCompleted((prev) => [...prev, lessonId]);
      alert("Lesson marked as completed!");

      const nextLesson = getNextLesson(lessons, lessonId);
      if (nextLesson) {
        setTimeout(() => setCurrentLesson(nextLesson), 800);
      } else {
        alert("🎉 You’ve completed all lessons! You can now take the quiz.");
      }
    } catch (err) {
      console.error("Error completing lesson:", err);
      alert("Failed to update completion status");
    }
  };

  // ✅ Helpers
  const getNextLesson = (lessons, currentId) => {
    const idx = lessons.findIndex((l) => l.id === currentId);
    return idx >= 0 && idx + 1 < lessons.length ? lessons[idx + 1] : null;
  };

  const isLastLesson = (lessons, currentId) => {
    const last = lessons[lessons.length - 1];
    return last && last.id === currentId;
  };

  if (loading)
    return (
      <div className="flex justify-center items-center pt-28 text-gray-600 min-h-[60vh]">
        Loading course player...
      </div>
    );

  if (!course)
    return (
      <div className="flex justify-center items-center pt-28 text-gray-600 min-h-[60vh]">
        Course not found.
      </div>
    );

  if (!isEnrolled)
    return (
      <div className="pt-28 text-center text-gray-700 min-h-[60vh]">
        You’re not enrolled in this course.
        <button
          onClick={() => navigate(`/courses/${courseId}`)}
          className="ml-2 text-primary underline"
        >
          Go to Course
        </button>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-6 pt-28 pb-20">
      {/* Sidebar */}
      <aside className="lg:w-1/4 bg-white border rounded-lg shadow-sm p-4 h-fit sticky top-24 self-start">
        <h2 className="text-lg font-semibold text-primary mb-3">
          Course Lessons
        </h2>
        <ul className="space-y-2">
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              onClick={() => setCurrentLesson(lesson)}
              className={`p-2 rounded cursor-pointer text-sm transition-all ${
                currentLesson?.id === lesson.id
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="truncate">{lesson.title}</span>
                {completed.includes(lesson.id) && (
                  <span className="text-green-500 text-xs font-medium">
                    ✓ Done
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Player */}
      <section className="flex-1 bg-white rounded-lg shadow-sm p-5 sm:p-6 lg:p-8">
        {currentLesson ? (
          <>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {currentLesson.title}
            </h2>

            {/* Video / PDF Viewer */}
            {currentLesson.type === "video" ? (
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={formatVideoUrl(currentLesson.url)}
                  title={currentLesson.title}
                  allowFullScreen
                  className="w-full h-[400px] rounded-lg border"
                ></iframe>
              </div>
            ) : currentLesson.type === "pdf" ? (
              <a
                href={currentLesson.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                📘 Open Resource (PDF)
              </a>
            ) : (
              <p className="text-gray-500 italic">
                No preview available for this content.
              </p>
            )}

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3 w-full">
              {/* Mark Completed */}
              <button
                onClick={() => handleLessonComplete(currentLesson.id)}
                disabled={completed.includes(currentLesson.id)}
                className={`px-5 py-2.5 rounded-md font-medium w-full sm:w-1/2 text-center ${
                  completed.includes(currentLesson.id)
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-blue-700 transition"
                }`}
              >
                {completed.includes(currentLesson.id)
                  ? "Completed"
                  : "Mark as Completed"}
              </button>

              {/* Next / Quiz Button */}
              {isLastLesson(lessons, currentLesson.id) ? (
                <button
                  onClick={() =>
                    navigate(`/quiz?course=${courseId}&lesson=${currentLesson.id}`)
                  }
                  className="px-5 py-2.5 rounded-md font-medium w-full sm:w-1/2 text-center bg-primary text-white hover:bg-blue-700 transition"
                >
                  Take Quiz →
                </button>
              ) : (
                getNextLesson(lessons, currentLesson.id) && (
                  <button
                    onClick={() =>
                      setCurrentLesson(getNextLesson(lessons, currentLesson.id))
                    }
                    className="px-5 py-2.5 rounded-md font-medium w-full sm:w-1/2 text-center bg-primary text-white hover:bg-blue-700 transition"
                  >
                    Next Lesson →
                  </button>
                )
              )}
            </div>
          </>
        ) : (
          <div className="text-gray-600 text-center py-20">
            Select a lesson from the sidebar to begin learning.
          </div>
        )}
      </section>
    </div>
  );
}
