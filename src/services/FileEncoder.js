class FileEncoder
{
  encodeFile(file) {
    return new Promise((resolve, reject) => {
      file.data = "[123]"
      resolve(file)
    })
  }

  readFile(file) {
    return new Promise((resolve, reject) => {

    })
  }
}

export default new FileEncoder()