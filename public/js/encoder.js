onmessage(e) {
  const files = e.data.files

  let id = e.data.id
  let dirname = '/' + id
  let status = 'Encoding'
  let progress = 0
  let complete = false
  let archiveFile = null

  FS.mkdir(dirname)
  FS.mount(WORKERFS, {
    files: files
  }, dirname);

  let process = _getProcessId(dirname)

  // setInterval(() => {
  //   progress = _getProgress(process)
  // }, 1000)

  _compressFiles(process)
}