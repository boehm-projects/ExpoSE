export class Response {
	constructor(){
		this.statusCode = undefined;
		this.headers = {};
		this.body = {};
	}


	// model all the possible values of the response
	// rewrite all possible function that may be used in the controller


	writeHead(statusCode){
		this.statusCode = statusCode;
	}

	end(data){
		this.body["data"] = data;
	}

	setHeader(header, value){
		this.headers[header] = value;
	}

}