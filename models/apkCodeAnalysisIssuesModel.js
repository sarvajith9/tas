const db = require('../services/dbConnection');

const createTableCodeAnalysisIssues = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS apk_code_analysis_issues (
      id SERIAL PRIMARY KEY,
      apk_scan_parent_id UUID NOT NULL,
      section TEXT,
      description TEXT,
      severity TEXT,
      file TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
};

const insertCodeAnalysisIssue = async (issue) => {
  const query = `
    INSERT INTO apk_code_analysis_issues (apk_scan_parent_id, section, description, severity, file)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [
    issue.apk_scan_parent_id,
    issue.section,
    issue.description,
    issue.severity,
    issue.file,
  ];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getCodeAnalysisIssues = async () => {
  const queryText = 'SELECT * FROM apk_code_analysis_issues;';
  return db.query(queryText);
};

module.exports = {
  createTableCodeAnalysisIssues,
  insertCodeAnalysisIssue,
  getCodeAnalysisIssues,
};