const Course = require('../models/Course');
const CourseContent = require('../models/CourseContent');
const Joi = require('joi');
const xss = require('xss');

const courseSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('').optional(),
  category: Joi.string().optional()
});

async function createCourse(req, res) {
  try {
    const { error, value } = courseSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.message });

    const instructor_id = req.user.id;
    const course = await Course.create({
      title: xss(value.title),
      description: xss(value.description || ''),
      category: xss(value.category || ''),
      instructor_id
    });
    res.status(201).json({ success: true, data: course });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to create course' });
  }
}

async function listCourses(req, res) {
  try {
    const limit = parseInt(req.query.limit || 20);
    const offset = parseInt(req.query.offset || 0);
    const courses = await Course.list({ limit, offset });
    res.json({ success: true, data: courses });
  } catch (err) {
    console.error("❌ Error fetching courses:", err);
    res.status(500).json({ success: false, message: "Failed to get courses" });
  }
}

async function getCourse(req, res) {
  try {
    const course = await Course.findById(req.params.id);
    if (!course)
      return res.status(404).json({ success: false, message: "Course not found" });

    const contents = await CourseContent.listByCourse(course.id);
    res.json({ success: true, data: { course, contents } });
  } catch (err) {
    console.error("❌ Error fetching course:", err);
    res.status(500).json({ success: false, message: "Failed to get course" });
  }
}

async function updateCourse(req, res) {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Not found' });

    const { error, value } = courseSchema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.message });

    const updated = await Course.update(req.params.id, value);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update course' });
  }
}

async function deleteCourse(req, res) {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ success: false, message: 'Not found' });
    await Course.delete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete course' });
  }
}

async function uploadContent(req, res) {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const { courseId, type, title } = req.body;
    const content = await CourseContent.add({
      course_id: courseId,
      type: type || 'file',
      url: `/uploads/${req.file.filename}`,
      duration: null,
      title: title || req.file.originalname
    });
    res.status(201).json({ success: true, data: content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Upload failed' });
  }
}

module.exports = { createCourse, listCourses, getCourse, updateCourse, deleteCourse, uploadContent };
