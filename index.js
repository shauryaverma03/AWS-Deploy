const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const htmlPath = path.join(__dirname, 'public', 'index.html');

const server = http.createServer((request, response) => {
	if (request.url !== '/') {
		response.writeHead(404, { 'Content-Type': 'text/plain' });
		response.end('Not found');
		return;
	}

	fs.readFile(htmlPath, (error, html) => {
		if (error) {
			response.writeHead(500, { 'Content-Type': 'text/plain' });
			response.end('Unable to load page');
			return;
		}

		response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
		response.end(html);
	});
});

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
