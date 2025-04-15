const { insertNetworkSecurityIssue, getNetworkSecurityIssues } = require('../models/apkNetworkSecurityIssuesModel');

const saveNetworkSecurityIssue = async (report) => {
  if (!report.network_security_issues || !Array.isArray(report.network_security_issues)) {
    throw new Error("report.network_security_issues must be an array");
  }

  const savedIssues = [];
  for (const issue of report.network_security_issues) {
    const record = {
      apk_scan_parent_id: report.uuid,
      severity: issue.severity,
      description: issue.description,
    };
    const savedIssue = await insertNetworkSecurityIssue(record);
    savedIssues.push(savedIssue);
  }
  return savedIssues;
};

const jsonNetworkSecurityIssues = async (req, res) => {
  try {
    const result = await getNetworkSecurityIssues();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving network security issues:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
};

module.exports = {
  saveNetworkSecurityIssue,
  jsonNetworkSecurityIssues,
};