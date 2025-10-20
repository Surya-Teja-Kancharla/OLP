# OLP Backend

Requirements

- Node 18+
- PostgreSQL

Setup

1. Copy .env.example to .env and set DB credentials & JWT_SECRET.
2. Ensure database and schema are created (schema.sql in database/).
3. From server/:
   npm install
   npm run dev

Docker

- Build: docker build -t olp-backend .
- Use docker-compose at project root to bring up services.

APIs

- /api/auth/register
- /api/auth/login
- /api/courses...
- /api/enrollments...
- /api/quizzes...
- /api/forum...
