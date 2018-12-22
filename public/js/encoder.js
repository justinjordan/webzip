onmessage = function(e) {

  console.log(this)

  return

  var files = e.data.files
  var id = e.data.id
  var dirname = e.data.dirname

  var status = 'Encoding'
  var progress = 0
  var complete = false
  var archiveFile = null

  // var process = _getProcessId(dirname)

  // setInterval(function() {
  //   progress = _getProgress(process)
  // }, 1000)

  // _compressFiles(process)
}