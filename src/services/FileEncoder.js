class FileEncoder
{
  constructor() {
    this.status = 'Pending'
    this.progress = null
    this.complete = false
    this.filename = 'archive-' + this.getRandomHash(10) + '.zip'
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

  encodeFiles(files) {
    return new Promise((resolve, reject) => {
      const encoder = new Worker('/js/encoder.js')

      encoder.onmessage = e => {
        this.progress = e.data.progress
        this.status = e.data.status
        this.complete = e.data.complete
        this.archiveFile = e.data.archiveFile
      }

      encoder.postMessage({
        id: this.getRandomHash(8),
        files: files,
      })
    })
  }
}

export default FileEncoder