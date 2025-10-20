<h1>🎓 Online Learning Platform (OLP)</h1>

<p>An end-to-end <strong>Online Learning Platform</strong> built with <strong>React (Vite)</strong>, <strong>Node.js (Express)</strong>, and <strong>PostgreSQL</strong>, designed to streamline course delivery, student progress tracking, and instructor management — deployed on <strong>Render</strong>.</p>

<p><strong>Developed by:</strong> K. Surya Teja<br>
<strong>Role:</strong> Full Stack Developer (CSE - AI & ML)</p>

<hr>

<h2>🚀 Live Demo</h2>

<table>
<tr><th>Component</th><th>URL</th></tr>
<tr><td>🌐 Frontend</td><td><a href="https://olp-frontend.onrender.com">https://olp-frontend.onrender.com</a></td></tr>
<tr><td>⚙️ Backend</td><td><a href="https://olp-wfls.onrender.com">https://olp-wfls.onrender.com</a></td></tr>
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

<pre>
docker compose up --build
</pre>

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
<tr><td>VITE_API_URL</td><td>Backend API base URL (e.g., <a href="https://olp-wfls.onrender.com">https://olp-wfls.onrender.com</a>)</td></tr>
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
</table>

<h3>Enrollments</h3>
<table>
<tr><th>Method</th><th>Endpoint</th><th>Description</th></tr>
<tr><td>POST</td><td>/api/enroll</td><td>Enroll a student</td></tr>
<tr><td>GET</td><td>/api/enrollments/:userId</td><td>Get student enrollments</td></tr>
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

<h2>🖼️ Screenshots (To Be Added)</h2>

<pre>
![Dashboard Screenshot](screenshots/dashboard.png)
![Course Player Screenshot](screenshots/course_player.png)
![Forum Screenshot](screenshots/forum.png)
</pre>

<hr>

<h2>🎥 Video Walkthrough (Optional)</h2>

<p>Once ready, upload your walkthrough video (e.g., Loom, YouTube) and link it here:</p>

<pre>
📹 <a href="https://youtu.be/r51MfW6LPaM">Watch Demo Video </a>
</pre>

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

<p>⭐ <strong>If you found this project helpful, consider giving it a star on GitHub!</strong></p>
