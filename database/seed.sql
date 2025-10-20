-- Seed data for Online_Learning_Platform
-- Assumes schema.sql has already been applied.

-- Create users (admin, instructors, students)
INSERT INTO users (name, email, password_hash, role)
VALUES
('Surya Teja', 'surya@gmail.com', crypt('admin123', gen_salt('bf')), 'admin'),
('Dr. Rajesh Kumar', 'rajesh@gmail.com', crypt('instructor123', gen_salt('bf')), 'instructor'),
('Dr. Geeta Patel', 'geeta@gmail.com', crypt('instructor123', gen_salt('bf')), 'instructor'),
('Aditya Varma', 'aditya@gmail.com', crypt('student123', gen_salt('bf')), 'student'),
('Priya Prakash', 'priya@gmail.com', crypt('student123', gen_salt('bf')), 'student'),
('Varun Kumar', 'varun@gmail.com', crypt('student123', gen_salt('bf')), 'student');

-- Courses: 3 by Rajesh (user id 2), 3 by Geeta (user id 3)
INSERT INTO courses (title, description, category, instructor_id)
VALUES
('Full Stack Web Development', 'Learn complete web development from frontend to backend.', 'Web Development', 2),
('Database Management Systems', 'Understand relational databases and SQL queries.', 'Database Systems', 2),
('Operating Systems Concepts', 'Fundamentals of OS: processes, memory, files.', 'Computer Science', 2),
('Data Science with Python', 'Analyze data and build predictive models using Python.', 'Data Science', 3),
('Machine Learning Basics', 'Supervised and unsupervised learning fundamentals.', 'Artificial Intelligence', 3),
('Cloud Computing Fundamentals', 'Introduction to cloud concepts and providers.', 'Cloud Computing', 3);

-- Course content: each course => 4 items (2 videos, 2 pdfs)

-- Course 1: Full Stack Web Development
INSERT INTO coursecontent (course_id, type, url, duration)
VALUES
(1, 'video', 'https://www.youtube.com/watch?v=nu_pCVPKzTk', '00:18:00'),
(1, 'video', 'https://www.youtube.com/watch?v=Ke90Tje7VS0', '00:20:00'),
(1, 'pdf', 'https://example.com/resources/html_css_basics.pdf', NULL),
(1, 'pdf', 'https://example.com/resources/react_notes.pdf', NULL);

-- Course 2: Database Management Systems
INSERT INTO coursecontent (course_id, type, url, duration)
VALUES
(2, 'video', 'https://www.youtube.com/watch?v=HXV3zeQKqGY', '00:25:00'),
(2, 'video', 'https://www.youtube.com/watch?v=9Pzj7Aj25lw', '00:22:00'),
(2, 'pdf', 'https://example.com/resources/sql_basics.pdf', NULL),
(2, 'pdf', 'https://example.com/resources/db_design_tutorial.pdf', NULL);

-- Course 3: Operating Systems Concepts
INSERT INTO coursecontent (course_id, type, url, duration)
VALUES
(3, 'video', 'https://www.youtube.com/watch?v=vBURTt97EkA', '00:28:00'),
(3, 'video', 'https://www.youtube.com/watch?v=26QPDBe-NB8', '00:24:00'),
(3, 'pdf', 'https://example.com/resources/os_fundamentals.pdf', NULL),
(3, 'pdf', 'https://example.com/resources/os_scheduling.pdf', NULL);

-- Course 4: Data Science with Python
INSERT INTO coursecontent (course_id, type, url, duration)
VALUES
(4, 'video', 'https://www.youtube.com/watch?v=ua-CiDNNj30', '00:30:00'),
(4, 'video', 'https://www.youtube.com/watch?v=r-uOLxNrNk8', '00:27:00'),
(4, 'pdf', 'https://example.com/resources/data_science_intro.pdf', NULL),
(4, 'pdf', 'https://example.com/resources/pandas_tutorial.pdf', NULL);

-- Course 5: Machine Learning Basics
INSERT INTO coursecontent (course_id, type, url, duration)
VALUES
(5, 'video', 'https://www.youtube.com/watch?v=Gv9_4yMHFhI', '00:32:00'),
(5, 'video', 'https://www.youtube.com/watch?v=i_LwzRVP7bg', '00:29:00'),
(5, 'pdf', 'https://example.com/resources/ml_overview.pdf', NULL),
(5, 'pdf', 'https://example.com/resources/supervised_learning_notes.pdf', NULL);

-- Course 6: Cloud Computing Fundamentals
INSERT INTO coursecontent (course_id, type, url, duration)
VALUES
(6, 'video', 'https://www.youtube.com/watch?v=2LaAJq1lB1Q', '00:30:00'),
(6, 'video', 'https://www.youtube.com/watch?v=2LaAJq1lB1Q', '00:31:00'),
(6, 'pdf', 'https://example.com/resources/cloud_intro.pdf', NULL),
(6, 'pdf', 'https://example.com/resources/aws_azure_basics.pdf', NULL);

-- Enrollments: 3 enrollments per student (total 9)
-- Aditya (user id 4): courses 1,4,5
INSERT INTO enrollments (course_id, user_id, progress) VALUES (1,4,60.0),(4,4,40.0),(5,4,30.0);

-- Priya (user id 5): courses 2,3,6
INSERT INTO enrollments (course_id, user_id, progress) VALUES (2,5,20.0),(3,5,50.0),(6,5,10.0);

-- Varun (user id 6): courses 1,5,6
INSERT INTO enrollments (course_id, user_id, progress) VALUES (1,6,70.0),(5,6,45.0),(6,6,25.0);

-- Quizzes: one per course with JSON questions
INSERT INTO quizzes (course_id, questions, passing_score) VALUES
(1, '[
  {"question":"What does CSS stand for?","options":["Cascading Style Sheets","Colorful Style System","Creative Style Syntax"],"answer":"Cascading Style Sheets"},
  {"question":"Which tag defines a hyperlink?","options":["<link>","<a>","<href>"],"answer":"<a>"}
]', 50),

(2, '[
  {"question":"Which SQL keyword is used to retrieve data?","options":["SELECT","GET","FETCH"],"answer":"SELECT"},
  {"question":"What is a primary key?","options":["Unique identifier","Foreign key","Duplicate column"],"answer":"Unique identifier"}
]', 60),

(3, '[
  {"question":"What is the function of an Operating System?","options":["Manage hardware and software","Run applications only","Control browsers"],"answer":"Manage hardware and software"},
  {"question":"Which of the following is not an OS?","options":["Linux","Windows","Oracle"],"answer":"Oracle"}
]', 50),

(4, '[
  {"question":"Which library is used for data analysis in Python?","options":["TensorFlow","Pandas","Flask"],"answer":"Pandas"},
  {"question":"Which visualization library is commonly used?","options":["Matplotlib","NumPy","Requests"],"answer":"Matplotlib"}
]', 55),

(5, '[
  {"question":"Supervised learning uses what type of data?","options":["Labeled","Unlabeled","No data"],"answer":"Labeled"},
  {"question":"Which algorithm is used for classification?","options":["KNN","K-Means","PCA"],"answer":"KNN"}
]', 60),

(6, '[
  {"question":"What does IaaS stand for?","options":["Infrastructure as a Service","Internet as a Software","Instance as a System"],"answer":"Infrastructure as a Service"},
  {"question":"Which company provides AWS?","options":["Microsoft","Amazon","Google"],"answer":"Amazon"}
]', 50);

-- Quiz submissions: a few example attempts
INSERT INTO quizsubmissions (quiz_id, user_id, score, attempts) VALUES
(1,4,80,1),(2,5,60,1),(3,5,75,1),
(4,4,65,1),(5,6,70,1),(6,6,55,1);

-- Forum posts (sample)
INSERT INTO forumposts (course_id, user_id, content, upvotes) VALUES
(1,4,'Can someone explain how APIs integrate in full stack apps?',5),
(2,5,'What is the difference between primary key and unique key?',3),
(3,5,'How does CPU scheduling affect OS performance?',2),
(4,4,'Any dataset recommendations for practice?',4),
(5,6,'What is the difference between KNN and K-Means?',3),
(6,6,'How to get started with AWS free tier?',2);
