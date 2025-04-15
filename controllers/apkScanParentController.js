const { v4: uuidv4 } = require('uuid');
const { insertBaseReport, getApkScanParent } = require('../models/ApkScanParentModel');

const saveScanReport = async (scanData) => {
  const baseReport = {
    uuid: uuidv4(),
    app_name: scanData.appsec.app_name,
    file_name: scanData.appsec.file_name,
    hash: scanData.appsec.hash,
    version_name: scanData.appsec.version_name,
    security_score: scanData.appsec.security_score,
  };

  const savedReport = await insertBaseReport(baseReport);
  return savedReport;
};

const jsonApkScanParent = async (req, res) => {
  try {
    const result = await getApkScanParent();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving scan summaries:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
};

module.exports = {
  saveScanReport,
  jsonApkScanParent,
};
