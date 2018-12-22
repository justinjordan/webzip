#ifndef WEBZIP_HPP
#define WEBZIP_HPP

#include <string>
#include <vector>
#include <iostream>
#include <stdexcept>
#include <dirent.h>
#include <zip.h>
#include <sys/stat.h>

namespace Webzip
{
  class Encoder
  {
  public:
    static int encodeDir(const char* dir, const char* output = "", zip_t* archive = NULL);
    static void printDir(const char* dir);
    static std::vector<std::string> getFiles(const char* dir);
    static bool isDir(const char* dir);
  };
}

#endif