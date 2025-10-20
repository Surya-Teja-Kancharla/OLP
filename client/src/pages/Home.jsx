import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Welcome to Online Learning Platform</h1>
      <p>
        Learn new skills, enroll in courses, take quizzes and participate in
        course discussions.
      </p>

      <div style={{ marginTop: 20 }}>
        <Link to="/courses">
          <button>Browse Courses</button>
        </Link>{" "}
        <Link to="/signup">
          <button>Get Started</button>
        </Link>
      </div>

      <section style={{ marginTop: 30 }}>
        <h3>Quick Links</h3>
        <ul>
          <li>
            <Link to="/courses">All Courses</Link>
          </li>
          <li>
            <Link to="/forum">Discussion Forum</Link>
          </li>
          <li>
            <Link to="/quiz">Submit Quiz</Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
