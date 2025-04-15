const db = require('../services/dbConnection');

const createTableManifestFindings = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS apk_manifest_findings (
      id SERIAL PRIMARY KEY,
      apk_scan_parent_id UUID NOT NULL,
      severity TEXT,
      title TEXT,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
};

const insertManifestFinding = async (finding) => {
  const query = `
    INSERT INTO apk_manifest_findings (apk_scan_parent_id, severity, title, description)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [
    finding.apk_scan_parent_id,
    finding.severity,
    finding.title,
    finding.description,
  ];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getManifestFindings = async () => {
  const queryText = 'SELECT * FROM apk_manifest_findings;';
  return db.query(queryText);
};

module.exports = {
  createTableManifestFindings,
  insertManifestFinding,
  getManifestFindings,
};