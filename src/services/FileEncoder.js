class FileEncoder
{
  constructor(files) {
    this.files = files
    this.status = 'Pending'
    this.progress = null
    this.complete = false
    this.filename = 'archive' + this.getRandomHash(10) + '.zip'

    setTimeout(() => {
      this.status = 'Encoding'
      this.progress = 0

      let interval = setInterval(() => {
        this.progress += 1
        if (this.progress >= 100) {
          clearInterval(interval)
          this.processComplete()
        }
      }, 50)
    }, 1000)
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
    var encoder = new Worker('/js/encoder.js')

    encoder.onmessage = e => {
      console.log(e)
    }

    encoder.postMessage(files)
  }
}

export default FileEncoder