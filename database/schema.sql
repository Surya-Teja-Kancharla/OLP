-- ===============================================================
-- 🌐 Online Learning Platform Database Schema (Clean Version)
-- ===============================================================

-- Enable pgcrypto for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ===============================================================
-- USERS
-- ===============================================================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'student',
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================================
-- COURSES
-- ===============================================================
CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category VARCHAR(100),
  instructor_id INT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================================
-- COURSE CONTENT
-- ===============================================================
CREATE TABLE IF NOT EXISTS course_content (
  id SERIAL PRIMARY KEY,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  type VARCHAR(50),
  url TEXT,
  duration VARCHAR(50),
  title TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================================
-- ENROLLMENTS
-- ===============================================================
CREATE TABLE IF NOT EXISTS enrollments (
  id SERIAL PRIMARY KEY,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  progress INT DEFAULT 0,
  enrolled_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (course_id, user_id)
);

-- ===============================================================
-- QUIZZES
-- ===============================================================
CREATE TABLE IF NOT EXISTS quizzes (
  id SERIAL PRIMARY KEY,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  questions JSONB NOT NULL,
  passing_score INT DEFAULT 50,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================================
-- QUIZ SUBMISSIONS
-- ===============================================================
CREATE TABLE IF NOT EXISTS quiz_submissions (
  id SERIAL PRIMARY KEY,
  quiz_id INT REFERENCES quizzes(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  answers JSONB,
  score INT,
  attempts INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================================
-- FORUM POSTS
-- ===============================================================
CREATE TABLE IF NOT EXISTS forum_posts (
  id SERIAL PRIMARY KEY,
  course_id INT REFERENCES courses(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  parent_id INT REFERENCES forum_posts(id) ON DELETE CASCADE,
  content TEXT,
  upvotes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================================================
-- LESSON COMPLETION
-- ===============================================================
CREATE TABLE IF NOT EXISTS lesson_completion (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  lesson_id INT REFERENCES course_content(id) ON DELETE CASCADE,
  completed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, lesson_id)
);
