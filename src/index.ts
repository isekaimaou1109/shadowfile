const os: typeof import('os') = require('os');
const fs: typeof import('fs') = require('fs');
const path: typeof import('path') = require('path');
const { PythonShell } = require('python-shell');
const { execSync } = require('child_process');

if(os.platform() == 'win32') {
  /* neu day la windows */
  exports.hidefile = async function(filepath: string): Promise<boolean> {
    if(fs.existsSync(filepath)) {
      try {
        await execSync(`attrib +h ${filepath}`)
      } catch(e) {
        return false
      }
      return true
    }
  }
} else if(os.platform() == 'linux') {
  /* neu day la linux */
  exports.hidefile = async function(filepath: string): Promise<boolean> {
    const realPath: string[] = filepath.split(path.sep)
    if(fs.existsSync(realPath.join('/'))) {
      try {
        await fs.renameSync(realPath.join('/'), [...realPath.slice(0, realPath.length - 1), `.${realPath[realPath.length - 1]}`].join('/'))
      } catch(error) {
        return false
      }
      return true
    }
  }
}
