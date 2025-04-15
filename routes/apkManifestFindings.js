const express = require('express');
const { jsonManifestFindings } = require('../controllers/apkManifestFindingsController');
const router = express.Router();

router.get('/', jsonManifestFindings);

module.exports = router;
