const express = require('express');
const router = express.Router();
const {
  getThreats,
  getThreatById,
  getStats
} = require('../controllers/threatsController');

router.get('/stats', getStats);
router.get('/', getThreats);
router.get('/:id', getThreatById);





module.exports = router;
