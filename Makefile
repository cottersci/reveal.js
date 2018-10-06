PORT = 8001 #Port to serve presentation

install:
	npm install

clean:
	rm -rf etc
	rm -rf node_modules
	rm -f npm-debug.log
	
serve:
	npm start -- --port=$(PORT)
