const { insertCodeAnalysisIssue, getCodeAnalysisIssues } = require('../models/apkCodeAnalysisIssuesModel');

const saveCodeAnalysisIssue = async (report) => {
  if (!report.code_analysis_issues || !Array.isArray(report.code_analysis_issues)) {
    throw new Error("report.code_analysis_issues must be an array");
  }

  const savedIssues = [];
  for (const issue of report.code_analysis_issues) {
    let base64FileContent = '';
      if (issue.files) {
        base64FileContent = Buffer.from(issue.files).toString('base64');
      } else {
        console.error('File content is undefined for issue:', issue);
      }
    const record = {
      apk_scan_parent_id: report.uuid,
      section: issue.section,
      description: issue.description,
      severity: issue.severity,
      file: base64FileContent, 
    };

    const savedIssue = await insertCodeAnalysisIssue(record);
    savedIssues.push(savedIssue);
  }
  return savedIssues;
};

const jsonCodeAnalysisIssues = async (req, res) => {
  try {
    const result = await getCodeAnalysisIssues();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving code analysis issues:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
};

module.exports = {
  saveCodeAnalysisIssue,
  jsonCodeAnalysisIssues,
};