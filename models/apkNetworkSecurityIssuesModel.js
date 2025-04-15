const db = require('../services/dbConnection');

const createTableNetworkSecurityIssues = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS apk_network_security_issues (
      id SERIAL PRIMARY KEY,
      apk_scan_parent_id UUID NOT NULL,
      severity TEXT,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
};

const insertNetworkSecurityIssue = async (issue) => {
  const query = `
    INSERT INTO apk_network_security_issues (apk_scan_parent_id, severity, description)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [
    issue.apk_scan_parent_id,
    issue.severity,
    issue.description,
  ];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getNetworkSecurityIssues = async () => {
  const queryText = 'SELECT * FROM apk_network_security_issues;';
  return db.query(queryText);
};

module.exports = {
  createTableNetworkSecurityIssues,
  insertNetworkSecurityIssue,
  getNetworkSecurityIssues,
};