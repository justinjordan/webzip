all:
	emcc -O0 \
	  --shell-file src/layout.html \
		src/wasm/encoder.cpp -o public/index.html