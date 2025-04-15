const express = require('express');
const router = express.Router();

const apkScanRoutes = require('./apkScan');
const apkBinaryAnalysisWarningRoutes = require('./apkBinaryAnalysisWarning');
const apkCodeAnalysisIssuesRoutes = require('./apkCodeAnalysisIssues');
const apkManifestFindingsRoutes = require('./apkManifestFindings');
const apkNetworkSecurityIssuesRoutes = require('./apkNetworkSecurityIssues');
const apkScanSummaryRoutes = require('./apkScanSummary');
const apkScanParent = require('./apkScanParent');

router.use('/apk-scan', apkScanRoutes);
router.use('/apk-binary-analysis-warning', apkBinaryAnalysisWarningRoutes);
router.use('/apk-code-analysis-issues', apkCodeAnalysisIssuesRoutes);
router.use('/apk-manifest-findings', apkManifestFindingsRoutes);
router.use('/apk-network-security-issues', apkNetworkSecurityIssuesRoutes);
router.use('/apk-scan-summary', apkScanSummaryRoutes);
router.use('/apk-scan-parent', apkScanParent);

module.exports = router;
