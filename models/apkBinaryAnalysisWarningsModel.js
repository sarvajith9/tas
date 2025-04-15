const db = require('../services/dbConnection');

const createTableBinaryAnalysisWarnings = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS apk_binary_analysis_warnings (
      id SERIAL PRIMARY KEY,
      apk_scan_parent_id UUID NOT NULL,
      name TEXT,
      stack_canary TEXT,
      severity TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
};

const insertBinaryAnalysisWarning = async (warning) => {
  const query = `
    INSERT INTO apk_binary_analysis_warnings (apk_scan_parent_id, name, stack_canary, severity)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [
    warning.apk_scan_parent_id,
    warning.name,
    warning.stack_canary,
    warning.severity,
  ];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getBinaryAnalysisWarning = () => {
  const queryText = 'SELECT * FROM apk_binary_analysis_warnings;';
  return db.query(queryText);
};

module.exports = { createTableBinaryAnalysisWarnings, insertBinaryAnalysisWarning, getBinaryAnalysisWarning };
