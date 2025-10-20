const express = require('express');
const router = express.Router();
const {
  createCourse, listCourses, getCourse, updateCourse, deleteCourse, uploadContent
} = require('../controllers/course.controller');

const { authenticate } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/rbac.middleware');
const { upload } = require('../middleware/upload.middleware');

// public
router.get('/', listCourses);
router.get('/:id', getCourse);

// protected
router.post('/', authenticate, authorizeRoles('instructor', 'admin'), createCourse);
router.put('/:id', authenticate, authorizeRoles('instructor', 'admin'), updateCourse);
router.delete('/:id', authenticate, authorizeRoles('instructor', 'admin'), deleteCourse);

// upload content endpoint: accepts single file field 'file'
router.post('/:courseId/content', authenticate, authorizeRoles('instructor', 'admin'),
  upload.single('file'), (req, res) => {
    // map courseId param into body for controller convenience
    req.body.courseId = req.params.courseId;
    return uploadContent(req, res);
  });

module.exports = router;
