const express = require('express');
const { jsonScanSummary } = require('../controllers/apkScanSummaryController');
const router = express.Router();

router.get('/', jsonScanSummary);

module.exports = router;
