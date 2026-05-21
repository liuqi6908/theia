const fs = require('fs');
const path = require('path');

const directoryArgIndex = process.argv.findIndex(arg => arg === '--directory' || arg === '-e');
const directory = directoryArgIndex >= 0 && process.argv[directoryArgIndex + 1]
  ? process.argv[directoryArgIndex + 1]
  : 'plugins';

makeWritable(path.resolve(process.cwd(), directory));

function makeWritable(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    throw new Error(`Directory '${directoryPath}' does not exist.`);
  }

  for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      makeWritable(fullPath);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const stats = fs.statSync(fullPath);
    const writable = (stats.mode & 0o200) !== 0;

    if (!writable) {
      const executable = (stats.mode & 0o111) !== 0;
      fs.chmodSync(fullPath, executable ? 0o755 : 0o644);
    }
  }
}
