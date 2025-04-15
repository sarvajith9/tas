const { insertBinaryAnalysisWarning, getBinaryAnalysisWarning } = require('../models/apkBinaryAnalysisWarningsModel');

const saveBinaryAnalysisWarning = async (report) => {
  if (!report.binary_analysis_warnings || !Array.isArray(report.binary_analysis_warnings)) {
    throw new Error("report.binary_analysis_warnings must be an array");
  }

  const savedWarnings = [];
  for (const warning of report.binary_analysis_warnings) {
    const record = {
      apk_scan_parent_id: report.uuid,
      name: warning.name,
      stack_canary: warning.stack_canary,
      severity: warning.severity,
    };

    const savedWarning = await insertBinaryAnalysisWarning(record);
    savedWarnings.push(savedWarning);
  }
  return savedWarnings;
};

const jsonBinaryAnalysisWarning = async (req, res) => {
  try {
    const result = await getBinaryAnalysisWarning();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving items:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
};

module.exports = { saveBinaryAnalysisWarning, jsonBinaryAnalysisWarning };
