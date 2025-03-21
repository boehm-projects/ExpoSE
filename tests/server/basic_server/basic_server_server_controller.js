const S$ = require("S$");
const service = require("./basic_server_service.js");

let basicService = new service.BasicService();


function sendPostResponse(request, response) {
	let queryData;
	switch (request.url) {
		case "/test1":
			request.on("data", function (data) {
				queryData = data;
			});
			request.on("end", function () {
				let testString = /[a-zA-Z]+@[a-zA-Z]*/;
				if (testString.test(queryData)) {
					response.setHeader("Content-Type", "text/html");
					response.writeHead(201);
					response.end(`<!DOCTYPE HTML><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Alert Test</title></head><html lang='de'><body><h2>Email: ${queryData}</h2></body></html>`);
				}
				else {
					response.writeHead(401);
					response.end("Wrong Data Format");
				}
			});
			break;
		case "/test2":
			request.on("data", function (data) {
				queryData = data;

			});
			request.on("end", function () {
				response.setHeader("Content-Type", "text/plain");
				response.writeHead(202);
				response.end(basicService.fetchData(queryData));
			});
			break;
		default:
			response.setHeader("Content-Type", "text/plain");
			response.writeHead(401);
			response.end("Invalid POST request");
	}
}
function sendGetResponse(request, response) {

	switch (request.url) {
		case /^\/hello_world$/:
			response.setHeader("Content-Type", "text/plain");
			response.writeHead(418);
			response.end("I am a teapot with a regex");
			break
		case "/health":
			response.setHeader("Content-Type", "text/plain");
			response.writeHead(200);
			response.end("OK");
			break;
		case "/test1/":
			response.setHeader("Content-Type", "text/plain");
			if (typeof request.params.id !== "number") {
				response.writeHead(401);
				response.end("No valid id");
				break
			}
			response.writeHead(201);
			response.end(basicService.getById(request.params.id));
			break;
		case "/test3/":
			response.setHeader("Content-Type", "text/plain");
			let docId = request.params.docId;
			const validateSearchParamString = /^[a-fA-F0-9]{8}$/
			if (validateSearchParamString.test(docId)) {
				response.writeHead(201);
				response.end(`${docId}`);
				console.log("UUID- " + docId)
				break;
			}
			response.writeHead(401);
			response.end("Nope");
			break;
		case "/test2":
			response.setHeader("Content-Type", "text/html");
			response.writeHead(202);
			response.end("<!DOCTYPE HTML><head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"><title>Alert Test</title></head><html lang='de'><body><h2><script>alert(1);</script>moritz.b@ex.com</h2></body></html>");
			break;
		default:
			response.setHeader("Content-Type", "text/plain");
			response.writeHead(403);
			response.end("Invalid GET request");

	}
}

function onRequest(request, response) {
	if (request.method === "GET") {
		sendGetResponse(request, response);
	}
	else if (request.method === "POST") {
		sendPostResponse(request, response);
	}
	else {
		response.writeHead(404);
		response.end("Not Found");
	}
	return response;
}


module.exports = { onRequest };


