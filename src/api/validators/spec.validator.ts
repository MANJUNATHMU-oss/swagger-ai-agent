export const importSpecSchema = (body: any) => {
  const errors: any[] = [];
  if (!body || !body.source) {
    errors.push('source is required');
    return { valid: false, errors };
  }
  const source = body.source;
  if (!source.type) errors.push('source.type is required');
  if (source.type === 'url' && !source.url) errors.push('source.url is required for url type');
  if (source.type === 'file' && !source.path) errors.push('source.path is required for file type');
  // git type validation is minimal
  if (source.type === 'git' && !source.repo) errors.push('source.repo is required for git type');

  return { valid: errors.length === 0, errors };
};

export default importSpecSchema;
