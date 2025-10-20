const Enrollment = require('../models/Enrollment');

async function enroll(req, res) {
  try {
    const user_id = req.user.id;
    const { course_id } = req.body;
    if (!course_id) return res.status(400).json({ success: false, message: 'course_id required' });
    const enrollment = await Enrollment.enroll({ course_id, user_id });
    if (!enrollment) return res.status(200).json({ success: true, message: 'Already enrolled' });
    res.status(201).json({ success: true, data: enrollment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Enroll failed' });
  }
}

async function myEnrollments(req, res) {
  try {
    const user_id = req.user.id;
    const enrollments = await Enrollment.getUserEnrollments(user_id);
    res.json({ success: true, data: enrollments });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed' });
  }
}

async function updateProgress(req, res) {
  try {
    const user_id = req.user.id;
    const { course_id, progress } = req.body;
    if (typeof progress !== 'number') return res.status(400).json({ success: false, message: 'progress numeric' });
    const updated = await Enrollment.updateProgress(course_id, user_id, progress);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed' });
  }
}

module.exports = { enroll, myEnrollments, updateProgress };
