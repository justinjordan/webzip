all:
	em++ -O0 -std=c++11 \
		-I src/wasm/libzip/build \
		-I src/wasm/libzip/lib \
		-s EXPORTED_FUNCTIONS="['_getDirectoryContents','_compressDirectory']" \
		-s EXTRA_EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' \
		src/wasm/encoder.cpp -o public/index.js