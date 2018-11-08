// import 'emscripten-main.js'

class FileEncoder
{
  encodeFiles(files) {
    return new Promise((resolve, reject) => {
      
      // Mount WASM filesystem
      // FS.mkdir('/working')
      // FS.mount(WORKERFS, {
      //   files: files
      // }, '/working')

    })
  }
}

export default new FileEncoder()