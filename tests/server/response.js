export class Response {
	constructor(){
		this.statusCode = undefined;
		this.headers = {};
		this.body = {};
	}


	// model all the possible values of the response
	// rewrite all possible function that may be used in the controller


	writeHead(statusCode, headerObject){
		this.statusCode = statusCode;
		if (headerObject){
			for (const [key, value] of Object.entries(headerObject))
			{
				this.setHeader(key, value)
			}
		}
	}

	end(data){
		this.body["data"] = data;
	}

	setHeader(header, value){
		this.headers[header] = value;
	}

	

}