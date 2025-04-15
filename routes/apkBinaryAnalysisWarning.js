const express = require('express');
const router = express.Router();
const { jsonBinaryAnalysisWarning } = require('../controllers/apkBinaryAnalysisWarningsController');



router.get('/', jsonBinaryAnalysisWarning);

module.exports = router;
