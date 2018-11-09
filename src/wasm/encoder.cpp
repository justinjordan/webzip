#include <emscripten/emscripten.h>
#include <unistd.h>

using namespace std;

extern "C" {
    int EMSCRIPTEN_KEEPALIVE fileExists()
    {
      return ( access( "/customdir/", F_OK ) != -1 );
    }
}