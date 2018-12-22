#include "webzip.hpp"

using namespace Webzip;

bool Encoder::isDir(const char* dir)
{
  struct stat st;
  ::stat(dir, &st);
  return S_ISDIR(st.st_mode);
}

int Encoder::encodeDir(const char* dir, const char* output, zip_t* archive = NULL)
{
  int err;
  int result;
  std::string path = "";
  bool archiveOwner = false;
  std::vector<std::string> files = getFiles(dir);

  // create archive
  if (archive == NULL) {
    archiveOwner = true;
    archive = zip_open(output, ZIP_CREATE|ZIP_EXCL, &err);
  }

  // loop through dir files
  for (std::string file : files) {
    path = dir;
    path += "/";
    path += file;

    if (isDir(path.c_str())) {
      result = zip_dir_add(archive, path.c_str(), ZIP_FL_ENC_GUESS);

      if (result < 0) {
        throw std::runtime_error("Failed to add directory to archive");
      }

      // recursively encodeDir
      encodeDir(path.c_str(), output, archive);
    } else {
      zip_source_t *source = zip_source_file(archive, path.c_str(), 0, 0);

      result = zip_file_add(archive, path.c_str(), source, ZIP_FL_OVERWRITE);

      if (result < 0) {
        throw std::runtime_error("Failed to add file to archive");
      }
    }
  }

  // close if created in this scope
  if (archiveOwner) {
    zip_close(archive);
  }

  return 0;
}

std::vector<std::string> Encoder::getFiles(const char* dir)
{
  std::vector<std::string> output;
  DIR* dirp;
  dirent* dp;

  dirp = opendir(dir);
  if (dirp == NULL) {
    std::cerr << "Directory \"" << dir << "\" not found." << std::endl;
    return output;
  }

  std::string filename;
  while ((dp = readdir(dirp)) != NULL) {
    filename = dp->d_name;

    if (filename == "." || filename == "..") {
      continue;
    }

    output.push_back(filename);
  }

  closedir(dirp);

  return output;
}

void Encoder::printDir(const char* dir)
{
  DIR* dirp;
  dirent* dp;

  dirp = opendir(dir);
  if (dirp == NULL) {
    std::cerr << "Directory \"" << dir << "\" not found." << std::endl;
    return;
  }

  std::string filename;
  while ((dp = readdir(dirp)) != NULL) {
    filename = dp->d_name;

    if (filename == "." || filename == "..") {
      continue;
    }

    std::cout << filename << std::endl;
  }

  closedir(dirp);
}
