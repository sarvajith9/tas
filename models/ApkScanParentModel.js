const db = require('../services/dbConnection');

const createTableApkScanParent = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS apk_scan_parent (
      id SERIAL PRIMARY KEY,
      uuid UUID NOT NULL,
      app_name TEXT NOT NULL,
      file_name TEXT NOT NULL,
      hash TEXT NOT NULL,
      version_name TEXT NOT NULL,
      security_score NUMERIC NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await db.query(query);
};

const insertBaseReport = async (baseReport) => {
  const query = `
    INSERT INTO apk_scan_parent (uuid, app_name, file_name, hash, version_name, security_score)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [
    baseReport.uuid,
    baseReport.app_name,
    baseReport.file_name,
    baseReport.hash,
    baseReport.version_name,
    baseReport.security_score,
  ];
  const result = await db.query(query, values);
  return result.rows[0];
};

const getApkScanParent = async () => {
  const queryText = 'SELECT * FROM apk_scan_parent;';
  return db.query(queryText);
};

module.exports = {
 createTableApkScanParent,
  insertBaseReport,
  getApkScanParent,
};
