Webzip = {
  stdout: '',
  stderr: '',
}

Module = {
  preRun: function() {
    // setup io
    FS.init(prompt, function(charCode) {
      Webzip.stdout += String.fromCharCode(charCode)
    }, function(charCode) {
      Webzip.stdout += String.fromCharCode(charCode)
    })
  }
}
