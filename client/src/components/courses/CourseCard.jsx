import { BookOpen } from "lucide-react";

export default function CourseCard({ course, onEnroll }) {
  return (
    <div className="bg-white shadow-sm hover:shadow-lg rounded-xl p-5 flex flex-col justify-between transition">
      <div>
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="text-primary" />
          <h3 className="text-lg font-semibold">{course.title}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-2 line-clamp-3">
          {course.description}
        </p>
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
          {course.category}
        </span>
      </div>

      <button
        onClick={() => onEnroll(course.id)}
        className="mt-4 w-full bg-primary text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Enroll
      </button>
    </div>
  );
}
