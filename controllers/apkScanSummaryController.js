const { insertScanSummary, getScanSummary } = require('../models/apkScanSummaryModel');

const saveScanSummary = async (summaryData) => {
  const summary = {
    apk_scan_parent_id: summaryData.uuid,
    manifest_high: summaryData.summary.manifest_high,
    manifest_warning: summaryData.summary.manifest_warning,
    network_high: summaryData.summary.network_high,
    network_warning: summaryData.summary.network_warning,
    code_high: summaryData.summary.code_high,
    code_warning: summaryData.summary.code_warning,
  };

  const savedSummary = await insertScanSummary(summary);
  return savedSummary;
};

const jsonScanSummary = async (req, res) => {
  try {
    const result = await getScanSummary();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving scan summaries:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
};

module.exports = {
  saveScanSummary,
  jsonScanSummary,
};