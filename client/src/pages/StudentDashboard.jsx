import Layout from "../components/layout/Layout";
import { BookOpen, BarChart, MessageSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-primary">
          Welcome back, {user?.name}! 🎓
        </h1>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Courses Enrolled"
            value="4"
            icon={<BookOpen className="w-6 h-6 text-primary" />}
          />
          <StatCard
            title="Progress"
            value="60%"
            icon={<BarChart className="w-6 h-6 text-primary" />}
          />
          <StatCard
            title="Forum Posts"
            value="8"
            icon={<MessageSquare className="w-6 h-6 text-primary" />}
          />
        </div>

        {/* Learning journey */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            Your Learning Journey
          </h2>
          <p className="text-gray-600 text-sm">
            Keep learning, {user?.name}! You’re 60% through your current course.
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white shadow-sm hover:shadow-md rounded-lg p-5 flex items-center justify-between transition">
      <div>
        <h4 className="text-gray-600 text-sm">{title}</h4>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
      <div className="bg-indigo-100 p-3 rounded-full">{icon}</div>
    </div>
  );
}
