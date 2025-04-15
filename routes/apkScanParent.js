const express = require('express');
const { jsonApkScanParent } = require('../controllers/apkScanParentController');

const router = express.Router();

router.get('/', jsonApkScanParent);

module.exports = router;
