function cleanHTML(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/<[^>]*>/g, '');
}

function summarizeScanReport(data) {
  const output = {
    manifest_findings: (data.manifest_analysis?.manifest_findings || []).map(item => ({
      severity: item.severity,
      title: cleanHTML(item.title),
      description: cleanHTML(item.description)
    })),
    network_security_issues: (data.network_security?.network_findings || []).map(item => ({
      severity: item.severity,
      description: item.description
    })),
    binary_analysis_warnings: (data.binary_analysis || [])
      .filter(item => item.stack_canary?.severity === 'high')
      .map(item => ({
        name: item.name,
        stack_canary: item.stack_canary?.description,
        severity: item.stack_canary?.severity
      })),
    code_analysis_issues: Object.entries(data.code_analysis?.findings || {}).map(([key, value]) => ({
      section: key.replace(/_/g, ' ').toUpperCase(),
      files: Object.keys(value.files || {}),
      description: value.metadata?.description,
      severity: value.metadata?.severity
    })),
    summary: {
      manifest_high: data.manifest_analysis?.manifest_summary?.high || 0,
      manifest_warning: data.manifest_analysis?.manifest_summary?.warning || 0,
      network_high: data.network_security?.network_summary?.high || 0,
      network_warning: data.network_security?.network_summary?.warning || 0,
      code_high: data.code_analysis?.summary?.high || 0,
      code_warning: data.code_analysis?.summary?.warning || 0
    }
  };

  return output;
}

module.exports = summarizeScanReport;
