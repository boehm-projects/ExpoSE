const http = require("http");
const {onRequest} = require("./basic_server_server_controller");

const server = http.createServer((req, res) => {
	// Routing
	onRequest(req, res);
});

const port = 3000;
server.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
