const db = require('../services/dbConnection'); 
const { createTableApkScanParent } = require('./ApkScanParentModel');
const { createTableManifestFindings } = require('./apkManifestFindingsModel');
const { createTableNetworkSecurityIssues } = require('./apkNetworkSecurityIssuesModel');
const { createTableBinaryAnalysisWarnings } = require('./apkBinaryAnalysisWarningsModel');
const { createTableCodeAnalysisIssues } = require('./apkCodeAnalysisIssuesModel');
const { createTableScanSummary } = require('./apkScanSummaryModel');

const createTableIfNotExists = async () => {
  try {
        await createTableApkScanParent();
        await createTableManifestFindings();
        await createTableNetworkSecurityIssues();
        await createTableBinaryAnalysisWarnings();
        await createTableCodeAnalysisIssues();
        await createTableScanSummary();
    console.log('Table created or already exists');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

const findByHash = async (hash) => {
        const query = `SELECT * FROM apk_scan_parent WHERE hash = $1 LIMIT 1`;
        const result = await db.query(query, [hash]);
        return result.rows[0];
      };

const getUUID = async (hash) => {
        const query = `SELECT uuid FROM apk_scan_parent WHERE hash = $1 LIMIT 1`;
        const result = await db.query(query, [hash]);
        return result.rows[0]?.uuid || null;
      };
      
module.exports = { createTableIfNotExists, findByHash, getUUID };