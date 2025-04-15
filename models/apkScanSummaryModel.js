const db = require('../services/dbConnection');

const createTableScanSummary = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS apk_scan_summary (
      id SERIAL PRIMARY KEY,
      apk_scan_parent_id UUID NOT NULL,
      manifest_high INTEGER,
      manifest_warning INTEGER,
      network_high INTEGER,
      network_warning INTEGER,
      code_high INTEGER,
      code_warning INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
};

const insertScanSummary = async (summary) => {
  const query = `
    INSERT INTO apk_scan_summary (apk_scan_parent_id, manifest_high, manifest_warning, network_high, network_warning, code_high, code_warning)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [
    summary.apk_scan_parent_id,
    summary.manifest_high,
    summary.manifest_warning,
    summary.network_high,
    summary.network_warning,
    summary.code_high,
    summary.code_warning,
  ];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getScanSummary = async () => {
  const queryText = 'SELECT * FROM apk_scan_summary;';
  return db.query(queryText);
};

module.exports = {
  createTableScanSummary,
  insertScanSummary,
  getScanSummary,
};