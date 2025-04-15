const express = require('express');
const { jsonNetworkSecurityIssues } = require('../controllers/apkNetworkSecurityIssuesController');
const router = express.Router();

router.get('/', jsonNetworkSecurityIssues);

module.exports = router;
