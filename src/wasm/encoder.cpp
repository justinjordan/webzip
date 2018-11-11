#include <emscripten/emscripten.h>
#include <iostream>
// #include <fstream>  
#include <unistd.h>  

extern "C" {
  int EMSCRIPTEN_KEEPALIVE getProcessId(char* dir)
  {
    std::cout << dir;

    return 0;
  }
}