export class Request {
	constructor(url, method, data){
		this.url = url;
		this.method = method;
		this.data = data;
		this.connection = {
			destroy: function(){
				console.log("Connection destroyed");
			}
		};

	}


	// model all the possible values of the response
	// rewrite all possible function that may be used in the controller

	on(event, callback) {
		switch (event) {
		case "data":
			callback(this.data);
			break;
		case "end":
			callback();
			break;
		}
	}
}