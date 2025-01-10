import {Response} from "../response.js";
import {Request} from "../request.js";
const S$ = require("S$");


import {onRequest} from "./basic_server_server_controller.js";

function runTest(){
	let data = S$.symbol("client_data", "");
	//let queryParams =  S$.symbol("req_obj",{id: 1, docId : "4b916e7b-1c75-4e15-96f6-24ca083a2e41"});
	let queryParams =  {id: S$.symbol("id", 1), docId: S$.symbol("doc_id", "4b916e7b")}
	let request = new Request(
		S$.symbol("path", "/test1"),
		S$.symbol("method", "GET"),
		data, queryParams);
	const response = new Response();
	let resp = onRequest(request,response);
	console.log(request);
	console.log(resp);
}

runTest();