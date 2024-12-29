import {Response} from "../response.js";
import {Request} from "../request.js";
const S$ = require("S$");


import {onRequest} from "./basic_server_server_controller.js";

function runTest(){
	let data = S$.symbol("client_data", "uh");
	let request = new Request(
		S$.symbol("path", "/test1"),
		S$.symbol("method", "POST"),
		data);
	const response = new Response();
	let resp = onRequest(request,response);
	console.log(request);
	console.log(resp);
}

runTest();