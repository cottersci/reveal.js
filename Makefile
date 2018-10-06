PORT=8001 #Port to serve presentation

install:
	#(( cd ./src & npm install ))
	npm --prefix ./src install

clean:
	rm -rf ./src/etc
	rm -rf ./src/node_modules
	rm -f npm-debug.log

serve:
	npm --prefix ./src start -- --port=$PORT
