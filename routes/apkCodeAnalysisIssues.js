const express = require('express');
const { jsonCodeAnalysisIssues } = require('../controllers/apkCodeAnalysisIssuesController');
const router = express.Router();

router.get('/', jsonCodeAnalysisIssues);

module.exports = router;
