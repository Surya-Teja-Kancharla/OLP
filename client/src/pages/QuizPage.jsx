import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchQuiz, submitQuiz } from "../services/quizService";

export default function QuizPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const courseId = params.get("course");

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchQuiz(courseId);
        setQuiz(data.quiz);
      } catch (err) {
        console.error(err);
        alert("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await submitQuiz(courseId, quiz.questions.map((_, i) => answers[i] || ""));
      setResult(res);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit quiz");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-gray-600">Loading quiz…</div>;
  if (!quiz) return <div className="text-center text-gray-600 mt-10">Quiz not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-primary mb-4">
        Course Quiz – {quiz.title || `Course ${courseId}`}
      </h1>

      {result ? (
        <div className="text-center space-y-3">
          <p className="text-lg font-semibold">
            Score: <span className="text-primary">{result.score}%</span>
          </p>
          <p className={`text-lg font-bold ${result.passed ? "text-green-600" : "text-red-600"}`}>
            {result.passed ? "✅ Passed" : "❌ Failed"}
          </p>
          <p className="text-sm text-gray-600">
            Attempts left: {result.attemptsLeft}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {quiz.questions.map((q, i) => (
            <div key={i}>
              <p className="font-medium mb-2">{i + 1}. {q.question}</p>
              <div className="space-y-1">
                {q.options.map((opt, j) => (
                  <label key={j} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={opt}
                      onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                      className="text-primary"
                      required
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Submit Quiz
          </button>
        </form>
      )}
    </div>
  );
}
