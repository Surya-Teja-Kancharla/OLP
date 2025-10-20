import { useState } from "react";
import { submitQuiz } from "../services/quizService";

export default function QuizPage() {
  const [quizId, setQuizId] = useState("");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const res = await submitQuiz(quizId, answers);
      setResult(res);
    } catch (err) {
      alert("Failed to submit quiz");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Submit Quiz</h2>
      <input
        type="text"
        placeholder="Quiz ID"
        value={quizId}
        onChange={(e) => setQuizId(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Answers JSON format"
        value={JSON.stringify(answers)}
        onChange={(e) => setAnswers(JSON.parse(e.target.value))}
      />
      <br />
      <button onClick={handleSubmit}>Submit Quiz</button>

      {result && (
        <div>
          <h3>Score: {result.score}</h3>
          <p>Correct: {result.correct} / {result.total}</p>
        </div>
      )}
    </div>
  );
}
