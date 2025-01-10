const S$ = require("S$");
const { Request } = require("../request");
import HttpMethods from "./http_methods.enum";

function createClient(){
    let client = new Client()
     
    return client;
}
class Client {
    constructor(){}
    generateRequest(){ 
        var req = new Request(
            S$.symbol("path"),
            HttpMethods[ S$.symbol("method")],
            S$.symbol("data","get"),
            S$.symbol("params","get"),
        )
        console.log(req)
        return req
    }
}

module.exports = createClient;