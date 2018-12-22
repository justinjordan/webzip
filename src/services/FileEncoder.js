import { fstat } from "fs";

class FileEncoder
{
  constructor() {
    this.status = 'Pending'
    this.progress = null
    this.complete = false
    this.filename = 'archive-' + this.getRandomHash(10) + '.zip'

    // bind C++ functions
    this.getDirectoryContents = Module.cwrap('getDirectoryContents', 'void', ['string'])
    this.compressDirectory = Module.cwrap('compressDirectory', 'void', ['string'])
  }

  getRandomHash(length) {
    let output = ''

    for (let i = 0; i < length; i++) {
      let rand = Math.floor(16 * Math.random())
      output += rand.toString(16)
    }

    return output
  }

  processComplete() {
    this.status = 'Done'
    this.complete = true
  }

  fileExists(path) {
    try {
      FS.open(path)
    } catch (e) {
      return false;
    }

    return true
  }

  /**
   * Recursively makes non-existent directories in path
   * @param {string} path /path/to/dir
   */
  makePath(path) {
    let parts = path.split('/')
    let currentPath = ''
    for (var i in parts) {
      if (!parts[i]) {
        currentPath += '/'
        continue;
      } else if (currentPath && currentPath !== '/') {
        currentPath += '/'
      }

      // add next directory
      currentPath += parts[i]

      if (this.fileExists(currentPath)) {
        continue
      }

      // make directory
      FS.mkdir(currentPath)
    }
  }

  /**
   * Writes files from FileList into browser filesystem
   * @param {FileList}  files   FileList of files to write to FS
   * @param {string}    dir     Root directory
   */
  writeFilesToFS(files, dir) {
    let file, path, fileDir, fstream, buffer;
    for (var i = 0; i < files.length; i++) {
      file = files[i];

      // get file path
      file.path = dir + '/' + file.webkitRelativePath || file.name
      file.dir = file.path.split('/').slice(0, -1).join('/')

      // file to buffer
      const reader = new FileReader()
      reader.onload = (f => {
        return e => {
          const buffer = e.target.result

          // write file
          this.makePath(f.dir)
          fstream = FS.open(f.path, 'w+')
          FS.write(fstream, buffer, 0, buffer.length)
        }
      })(file)

      // start read
      reader.readAsArrayBuffer(file)
    }
  }

  encodeFiles(files) {
    return new Promise((resolve, reject) => {
      // generate ID
      const processId = this.getRandomHash(8)
      const dirname = '/' + processId

      // move files to FS
      this.writeFilesToFS(files, dirname)

      this.compressDirectory(dirname)
    })
  }
}

export default FileEncoder