#include <emscripten/emscripten.h>
#include <iostream>
#include <fstream>  
#include <unistd.h>  

extern "C" {
  int EMSCRIPTEN_KEEPALIVE fileExists()
  {
    return (access("/hello.txt", F_OK) != -1);
  }

  int EMSCRIPTEN_KEEPALIVE createFiles()
  {
    std::ofstream outfile("/hello.txt");
    outfile << "Hello, world!" << std::endl;
    outfile.close();

    return 0;
  }
}