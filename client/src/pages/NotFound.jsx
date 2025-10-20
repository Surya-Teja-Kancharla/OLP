import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>404</h1>
      <p>Page not found.</p>
      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}
