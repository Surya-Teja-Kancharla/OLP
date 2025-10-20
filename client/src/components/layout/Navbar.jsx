import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: 10, background: "#eee" }}>
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/courses">Courses</Link> |{" "}
      <Link to="/enrolled">My Enrollments</Link> |{" "}
      <Link to="/forum">Forum</Link> |{" "}
      {user ? (
        <>
          <span style={{ marginLeft: 10 }}>
            Hello, <b>{user.name}</b> ({user.role})
          </span>{" "}
          <button onClick={logout} style={{ marginLeft: 10 }}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
