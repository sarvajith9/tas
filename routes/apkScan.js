const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const multer = require('multer');
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const summarizeScanReport = require('../utils/apkReportSummary');
const { saveScanReport } = require('../controllers/apkScanParentController');
const { saveManifestFinding } = require('../controllers/apkManifestFindingsController');
const { saveNetworkSecurityIssue } = require('../controllers/apkNetworkSecurityIssuesController');
const { saveBinaryAnalysisWarning } = require('../controllers/apkBinaryAnalysisWarningsController');
const { saveCodeAnalysisIssue } = require('../controllers/apkCodeAnalysisIssuesController');
const { saveScanSummary } = require('../controllers/apkScanSummaryController');
const { findByHash, getUUID } = require('../models/index');



router.post('/', upload.single('file'), async (req, res) => {
  try {
    const API_BASE_URL = process.env.API_BASE_URL;
    const API_KEY = process.env.API_KEY;
    const uploadUrl = `${API_BASE_URL}/upload`;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const form = new FormData();
    form.append('file', req.file.buffer, req.file.originalname);

    const uploadResponse = await axios.post(uploadUrl, form, {
      headers: {
        ...form.getHeaders(),
        'Authorization': API_KEY
      }
    });

    const apkHash = uploadResponse.data.hash;
    if (!apkHash) {
      return res.status(500).json({ error: 'File upload did not return a valid hash' });
    }

    const scanUrl = `${API_BASE_URL}/scan`;

    const userReScan = req.body.re_scan || "0";
    const scanPayload = {
      hash: apkHash,
      re_scan: userReScan
    };
   
    const scanResponse = await axios.post(scanUrl, scanPayload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': API_KEY
      }
    });
        // If savedReport is undefined or null, the hash already exists and no new record was created
        const existingRecord = await findByHash(scanResponse.data.appsec.hash);
        if (existingRecord) {
          const parentUUID = await getUUID(scanResponse.data.appsec.hash);
          return res.status(200).json({ message : 'data exists already exists in db', apk_scan_parent_id : parentUUID});
        } else{
          await saveScanReport(scanResponse.data);
        }
    const parentUUID = await getUUID(scanResponse.data.appsec.hash);
    const finalReport = await summarizeScanReport(scanResponse.data);
    finalReport.uuid = parentUUID;
    
          await saveManifestFinding(finalReport);
          await saveNetworkSecurityIssue(finalReport);
          await saveBinaryAnalysisWarning(finalReport);
          await saveCodeAnalysisIssue(finalReport);
          await saveScanSummary(finalReport);
    return res.status(200).json({ message: 'Save data in db successfully', id:parentUUID});
    
  } catch (error) {
    console.error('Error processing request:', error.message);
    return res.status(500).json({ error: 'Processing failed', details: error.message });
  }
});

module.exports = router;
