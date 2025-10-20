const express = require('express');
const router = express.Router();
const { enroll, myEnrollments, updateProgress } = require('../controllers/enrollment.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.post('/', authenticate, enroll);
router.get('/me', authenticate, myEnrollments);
router.put('/progress', authenticate, updateProgress);

module.exports = router;
