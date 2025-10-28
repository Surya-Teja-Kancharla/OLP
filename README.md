<h1>🎓 Online Learning Platform (OLP)</h1>
<p>An end-to-end <strong>Online Learning Platform</strong> built with <strong>React (Vite)</strong>, <strong>Node.js (Express)</strong>, and <strong>PostgreSQL</strong>, designed to streamline course delivery, student progress tracking, and instructor management — deployed on <strong>Render</strong>.</p>

<p><strong>Developed by:</strong> K. Surya Teja<br>
<strong>Role:</strong> Full Stack Developer (CSE - AI & ML)</p>

<hr>

<h2>🚀 Live Demo</h2>
<table>
<tr><th>Component</th><th>URL</th></tr>
<tr><td>🌐 Frontend</td><td><a href="https://olp-frontend.onrender.com">https://olp-frontend.onrender.com</a></td></tr>
<tr><td>⚙️ Backend</td><td><a href="https://olp-9f9i.onrender.com">https://olp-9f9i.onrender.com</a></td></tr>
<tr><td>🎬 Video Demo</td><td><a href="https://youtu.be/8RxxmPAv3v8?si=k7JMSHyQuoVTt2qu" target="_blank">Watch on YouTube</a></td></tr>
</table>

<hr>

<h2>🧩 Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li>React + Vite</li>
  <li>Tailwind CSS</li>
  <li>Context API for global state</li>
  <li>Lucide Icons & Shadcn UI components</li>
</ul>

<h3>Backend</h3>
<ul>
  <li>Node.js + Express.js</li>
  <li>PostgreSQL (via <code>pg</code> library)</li>
  <li>JWT Authentication</li>
  <li>Bcrypt password hashing</li>
  <li>Multer for file uploads</li>
</ul>

<h3>DevOps / Deployment</h3>
<ul>
  <li>Docker & Docker Compose</li>
  <li>Render (for backend, database & frontend hosting)</li>
</ul>

<hr>

<h2>📁 Project Structure</h2>
<pre>
OLP/
│
├── client/           # Frontend (React + Vite + Tailwind)
├── server/           # Backend (Express + PostgreSQL)
├── database/         # Database setup (Docker, schema, seed data)
├── docker-compose.yml
├── PROJECT_TREE.txt
└── README.md
</pre>

<hr>

<h2>⚙️ Setup Instructions</h2>

<h3>🧠 Prerequisites</h3>
<p>Ensure you have installed:</p>
<ul>
  <li>Node.js ≥ 20.19.0</li>
  <li>npm ≥ 10.x</li>
  <li>Docker & Docker Compose</li>
</ul>

<h3>🧩 Local Setup (without Docker)</h3>

<pre>
# 1️⃣ Clone the repository
git clone https://github.com/Surya-Teja-Kancharla/OLP.git
cd OLP

# 2️⃣ Setup the backend
cd server
npm install
npm start

# 3️⃣ Setup the frontend
cd ../client
npm install
npm run dev

# 4️⃣ Open in browser
http://localhost:5173
</pre>

<h3>🐳 Docker Setup</h3>
<pre>docker compose up --build</pre>

<p>This will:</p>
<ul>
  <li>Launch PostgreSQL (database)</li>
  <li>Start the Node.js backend</li>
  <li>Build and serve the React frontend</li>
</ul>

<p>Then open your browser at:</p>
<pre>http://localhost:5173</pre>

<hr>

<h2>🔑 Environment Variables</h2>

<h3>Backend (<code>server/.env</code>)</h3>
<table>
<tr><th>Variable</th><th>Description</th></tr>
<tr><td>PORT</td><td>Port number for backend</td></tr>
<tr><td>DATABASE_URL</td><td>PostgreSQL connection string</td></tr>
<tr><td>JWT_SECRET</td><td>Secret key for authentication</td></tr>
<tr><td>CORS_ORIGIN</td><td>Allowed frontend URL</td></tr>
<tr><td>NODE_ENV</td><td>Development / Production</td></tr>
</table>

<h3>Frontend (<code>client/.env</code>)</h3>
<table>
<tr><th>Variable</th><th>Description</th></tr>
<tr><td>VITE_API_URL</td><td>Backend API base URL (e.g., <a href="http://localhost:5000/api">http://localhost:5000/api</a>)</td></tr>
</table>

<hr>

<h2>📡 API Overview</h2>

<h3>Authentication</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>POST</td><td>/api/auth/register</td><td>Register new user</td></tr>
<tr><td>POST</td><td>/api/auth/login</td><td>User login</td></tr>
</table>

<h3>Courses</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>GET</td><td>/api/courses</td><td>Get all courses</td></tr>
<tr><td>POST</td><td>/api/courses</td><td>Add a new course (instructor only)</td></tr>
<tr><td>GET</td><td>/api/courses/:id</td><td>Get course details</td></tr>
<tr><td>DELETE</td><td>/api/courses/:id</td><td>Delete a course (admin only)</td></tr>
</table>

<h3>Enrollments</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>POST</td><td>/api/enrollments</td><td>Enroll a student</td></tr>
<tr><td>GET</td><td>/api/enrollments/me</td><td>Get current user enrollments</td></tr>
<tr><td>PUT</td><td>/api/enrollments/progress</td><td>Update course progress</td></tr>
</table>

<h3>Lesson Completion</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>POST</td><td>/api/lesson-completion</td><td>Mark a lesson as completed</td></tr>
<tr><td>GET</td><td>/api/lesson-completion/:courseId</td><td>Get completed lessons for a course</td></tr>
</table>

<h3>Forum</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>GET</td><td>/api/forum</td><td>Get all forum posts</td></tr>
<tr><td>POST</td><td>/api/forum</td><td>Create new forum post</td></tr>
</table>

<hr>

<h2>🧪 Testing</h2>
<p>To test API routes using <strong>Postman</strong>:</p>
<ol>
  <li>Start backend locally (<code>npm start</code>)</li>
  <li>Import API collection (<code>/server/tests/OLP.postman_collection.json</code> if available)</li>
  <li>Test authentication, course management, and forum APIs.</li>
</ol>

<hr>

<h2>🧠 Key Features</h2>
<ul>
  <li>👨‍🏫 Instructor and student dashboards</li>
  <li>🎥 Video streaming (HLS/DASH-ready)</li>
  <li>🧩 Modular API with RBAC (Role-Based Access Control)</li>
  <li>🗃 PostgreSQL relational database</li>
  <li>🧵 Course discussions & forums</li>
  <li>📈 Quiz and progress tracking</li>
</ul>

<hr>

<h2>🛠️ Recent Updates & Improvements (Version 2.1 — October 2025)</h2>
<p>This section highlights all updates and refactors introduced to enhance stability, functionality, and user experience.</p>

<h3>⚙️ Backend Enhancements</h3>
<ul>
  <li>Added <code>DELETE /api/courses/:id</code> for admin-only course deletion with cascading cleanup.</li>
  <li>Enhanced <code>lessonCompletion.routes.js</code> to auto-update progress when lessons are completed.</li>
  <li>Added progress formula:
    <pre>(Completed Lessons / Total Lessons) × 100</pre>
  </li>
  <li>Improved <code>enrollment.routes.js</code> with real-time progress sync and JWT validation.</li>
  <li>Refined PostgreSQL schema with <code>ON DELETE CASCADE</code> and unique constraints.</li>
</ul>

<h3>💻 Frontend Enhancements</h3>
<ul>
  <li>Replaced all <code>alert()</code> calls with non-blocking <strong>React Toastify</strong> notifications.</li>
  <li>Refactored <strong>CoursesPage.jsx</strong> to show toast-based success/failure enrollment feedback.</li>
  <li>Improved <strong>StudentDashboard.jsx</strong> with real-time progress visualization.</li>
  <li>Rebuilt <strong>CoursePlayer.jsx</strong>:
    <ul>
      <li>Added progress bar in sidebar.</li>
      <li>Added toast messages for lesson/course completion.</li>
      <li>Restored “Take Quiz” button (appears when progress = 100%).</li>
      <li>Improved next lesson navigation.</li>
    </ul>
  </li>
  <li>Added modal confirmation for course deletion in <strong>AdminDashboard.jsx</strong>.</li>
  <li>Removed “Quick Links” section from Home page and centered layout.</li>
</ul>

<h3>📊 Service Layer & UI Improvements</h3>
<ul>
  <li>Improved API abstraction with detailed error handling.</li>
  <li>Updated enrollment and lesson completion services to sync frontend state with backend instantly.</li>
  <li>Unified toast styling (<code>position: top-right</code>, <code>autoClose: 2000ms</code>).</li>
  <li>Enhanced mobile responsiveness for dashboards and player views.</li>
</ul>

<h3>✅ Bug Fixes</h3>
<ul>
  <li>Fixed “Cannot POST /api/courses” issue during course creation.</li>
  <li>Resolved progress not updating after marking lessons complete.</li>
  <li>Fixed alignment issues in Course Player on smaller devices.</li>
  <li>Fixed admin course deletion failure due to missing cascade dependencies.</li>
</ul>

<h3>📈 Summary of Changes</h3>
<table>
<tr><th>Area</th><th>Before</th><th>After</th></tr>
<tr><td>Enrollment</td><td>Alerts</td><td>Toast notifications with instant update</td></tr>
<tr><td>Progress</td><td>Static</td><td>Live backend-sync progress tracking</td></tr>
<tr><td>Course Deletion</td><td>Alert prompt</td><td>Secure modal with confirmation</td></tr>
<tr><td>Quiz</td><td>Missing</td><td>Reintroduced on 100% completion</td></tr>
<tr><td>UX</td><td>Plain</td><td>Responsive, animated, accessible</td></tr>
</table>

<h3>🧾 Commit Highlights</h3>
<pre>
+ Added lesson and course progress tracking
+ Restored Take Quiz button after completion
+ Integrated React Toastify globally
+ Improved admin dashboard deletion UX
+ Fixed cascading deletes in PostgreSQL
+ Enhanced responsive layout and accessibility
</pre>

<h3>💬 Developer Notes</h3>
<ul>
  <li>All updates maintain backward compatibility with previous routes.</li>
  <li>Includes structured logging for easier debugging in development mode.</li>
  <li>Future-proofed for certificate generation and AI-based recommendations.</li>
</ul>

<hr>

<h2>💡 Future Enhancements</h2>
<ul>
  <li>🧠 AI-driven course recommendations</li>
  <li>📄 Auto-generated PDF certificates</li>
  <li>🎥 WebRTC-based live classes</li>
  <li>💬 Chatbot support for learners</li>
</ul>

<hr>

<h2>🧑‍💻 Author</h2>
<p><strong>K. Surya Teja</strong><br>
Full Stack Developer | CSE (AI & ML)<br>
📍 Anil Neerukonda Institute of Technology and Sciences<br>
🔗 <a href="https://github.com/Surya-Teja-Kancharla">GitHub</a></p>

<hr>

<h2>🏁 License</h2>
<p>This project is licensed under the <strong>MIT License</strong> — feel free to use and modify it for educational or personal purposes.</p>

<hr>

<p>⭐ <strong>If you found this project helpful, consider giving it a star on GitHub!!</strong></p>
