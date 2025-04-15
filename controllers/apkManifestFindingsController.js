const { insertManifestFinding, getManifestFindings } = require('../models/apkManifestFindingsModel');

const saveManifestFinding = async (report) => {
  if (!report.manifest_findings || !Array.isArray(report.manifest_findings)) {
    throw new Error("report.manifest_findings must be an array");
  }

  const savedFindings = [];
  for (const finding of report.manifest_findings) {
    const record = {
      apk_scan_parent_id: report.uuid,
      severity: finding.severity,
      title: finding.title,
      description: finding.description,
    };

    // Insert each finding one by one
    const savedFinding = await insertManifestFinding(record);
    savedFindings.push(savedFinding);
  }
  return savedFindings;
};

const jsonManifestFindings = async (req, res) => {
  try {
    const result = await getManifestFindings();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving manifest findings:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
};

module.exports = {
  saveManifestFinding,
  jsonManifestFindings,
};