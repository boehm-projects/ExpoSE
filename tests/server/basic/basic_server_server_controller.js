const S$ = require("S$");
const service = require("./basic_server_service.js");

let basicService = new service.BasicService();


function sendPostResponse(request,response){
	switch (request.url) {
	case "/test1":
		// eslint-disable-next-line no-case-declarations
		let queryData;
		request.on("data", function(data) {
			queryData = data;

		});
		request.on("end", function() {
			let testString = /[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0 -9]*/;

			let scriptString = /<[A-Za-z0-9]+>[A-Za-z0-9]+<\/[A-Za-z0-9]>/;

			//
			console.log(`queryData: ${queryData}`);
			S$.assert(!scriptString.test(queryData));

			if (testString.test(queryData)) {
				// has to be here, otherwise the test will fail and the program will terminate
				S$.assert(testString.test(queryData));

				response.setHeader("Content-Type", "text/html");
				response.writeHead(201);
				response.end(`<!DOCTYPE HTML><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Alert Test</title></head><html lang='de'><body><h2>Email: ${queryData}</h2></body></html>`);
			}
			else{
				response.writeHead(401);
				response.end("Wrong Data Format");
			}
		});
		break;
	case "/test2":
		response.setHeader("Content-Type", "text/plain");
		response.writeHead(202);
		response.end(basicService.fetchData("blub"));
		break;
	default:
		response.writeHead(401);
		response.end("Invalid POST request");
	}
}
function sendGetResponse(request,response){
	if (/^\/hello_world$/.test(request.url)){
		response.setHeader("Content-Type", "text/plain");
		response.writeHead(418);
		response.end("I am a teapot with a regex");

	}
	else {
		switch (request.url) {
		case "/health":
			response.setHeader("Content-Type", "text/plain");
			response.writeHead(200);
			response.end("OK");
			break;
		case "/test1":
			response.setHeader("Content-Type", "text/plain");
			response.writeHead(201);
			response.end("Test 1");
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
}

function onRequest(request,response){
	if (request.method=== "GET") {
		sendGetResponse(request, response);
	}
	else if (request.method === "POST"){
		sendPostResponse(request, response);
	}
	else{
		response.writeHead(404);
		response.end("Not Found");
	}
	return response;
}


module.exports = {onRequest};


