all:
	em++ \
	  --shell-file src/layout.html \
		src/wasm/encoder.cpp -o public/index.html