#include <emscripten/emscripten.h>
#include <iostream>
#include <unistd.h>
#include <dirent.h>
#include <string>

#include "webzip.hpp"

using namespace Webzip;

extern "C" {
    void EMSCRIPTEN_KEEPALIVE getDirectoryContents(char* dir)
    {
        DIR* dirp;
        dirent* dp;

        dirp = opendir(dir);
        if (dirp == NULL) {
            std::cerr << "Directory " << dir << " not found." << std::endl;
            return;
        }

        while ((dp = readdir(dirp)) != NULL) {
            std::cout << dp->d_name << std::endl;
        }

        closedir(dirp);
    }

    void EMSCRIPTEN_KEEPALIVE compressDirectory(std::string dir)
    {
        std::string outputPath = dir;
        outputPath += ".zip";

        Encoder::encodeDir(dir.c_str(), outputPath.c_str());
    }
}
