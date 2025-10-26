import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { markLessonCompleted, getCompletedLessons } from "../services/lessonCompletionService";
import { getMyEnrollments } from "../services/enrollmentService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function CoursePlayer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [courseData, myEnrolls, completionData] = await Promise.all([
          getCourseById(courseId),
          getMyEnrollments(),
          getCompletedLessons(courseId),
        ]);

        setCourse(courseData);
        setLessons(courseData.contents || []);
        setCompleted(completionData.completedLessons || []);
        setProgress(completionData.progress || 0);

        const enrolledIds = myEnrolls.map((e) => e.course_id);
        setIsEnrolled(enrolledIds.includes(Number(courseId)));
      } catch (err) {
        console.error("Failed to load course:", err);
        toast.error("Failed to load course data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [courseId]);

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

  const handleLessonComplete = async (lessonId) => {
    if (user?.role !== "student") return;
    try {
      const res = await markLessonCompleted(lessonId);
      setCompleted((prev) => [...new Set([...prev, lessonId])]);
      setProgress(res.progress || progress);

      if (res.progress === 100) toast.success("🎉 Course fully completed!");
      else toast.success("✅ Lesson marked as completed!");

      const nextLesson = getNextLesson(lessons, lessonId);
      if (nextLesson) setCurrentLesson(nextLesson);
    } catch (err) {
      console.error("Error completing lesson:", err);
      toast.error("Failed to update completion status");
    }
  };

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

  if (user?.role === "student" && !isEnrolled)
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
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-6 pt-16 pb-12 min-h-[75vh]">
      {/* Sidebar */}
      <aside className="lg:w-1/4 bg-white border rounded-lg shadow-sm p-4 h-fit sticky top-20 self-start">
        <h2 className="text-lg font-semibold text-primary mb-3">Course Lessons</h2>

        {/* ✅ Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{progress}% completed</p>
        </div>

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
                  <span className="text-green-500 text-xs font-medium">✓</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Player */}
      <section className="flex-1 bg-white rounded-lg shadow-sm p-5 sm:p-6 lg:p-6 min-h-[65vh] flex flex-col justify-start">
        {currentLesson ? (
          <>
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900">
                {currentLesson.title}
              </h2>

              {currentLesson.type === "video" ? (
                <div className="aspect-w-16 aspect-h-9 mb-3 mt-1">
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
            </div>

            {/* ✅ Action Buttons */}
            <div className="mt-6 flex justify-end w-full">
              {user?.role === "student" && (
                <>
                  <button
                    onClick={() => handleLessonComplete(currentLesson.id)}
                    disabled={completed.includes(currentLesson.id)}
                    className={`px-5 py-2.5 rounded-md font-medium mr-3 ${
                      completed.includes(currentLesson.id)
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-blue-700 transition"
                    }`}
                  >
                    {completed.includes(currentLesson.id)
                      ? "Completed"
                      : "Mark as Completed"}
                  </button>

                  {/* ✅ Show Take Quiz when all lessons done */}
                  {progress === 100 ? (
                    <button
                      onClick={() =>
                        navigate(`/quiz?course=${courseId}&lesson=${currentLesson.id}`)
                      }
                      className="px-5 py-2.5 rounded-md font-medium bg-green-600 text-white hover:bg-green-700 transition"
                    >
                      Take Quiz →
                    </button>
                  ) : (
                    getNextLesson(lessons, currentLesson.id) && (
                      <button
                        onClick={() =>
                          setCurrentLesson(getNextLesson(lessons, currentLesson.id))
                        }
                        className="px-5 py-2.5 rounded-md font-medium bg-primary text-white hover:bg-blue-700 transition"
                      >
                        Next Lesson →
                      </button>
                    )
                  )}
                </>
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
