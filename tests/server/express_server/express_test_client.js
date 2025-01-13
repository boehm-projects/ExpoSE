const S$ = require("S$");
const { Request } = require("../request");
const { Response } = require("../response");
import HttpMethods from "../express_model/http_methods.enum";

function createClient() {
    let client = new Client()

    return client;
}
class Client {
    constructor() { 
        //This could be from a user input
        this.nameField = ""
        this.emailField = ""
        this.phoneNumber = ""
    }
    generateRequest() {
        
        //this.getUserInput()
        var req = new Request(
            S$.symbol("path", "/"),
            HttpMethods[ S$.symbol("method", 1)],
        )
        return req
    }


    getUserInput(){
        this.nameField = S$.symbol("name", this.nameField),
        this.emailField = S$.symbol("email", this.emailField),
        this.phoneNumber = S$.symbol("phoneNumber", this.phoneNumber)
    }


    doSomethingWithTheResponse(res){
        if (res instanceof Response){

            if (res.statusCode === 100) {
                console.log("must have been the wind")

            }

            if (res.statusCode === 200) {
                console.log("this worked")

            }
            else if (res.statusCode >= 400 && res.statusCode < 500){
                console.log("Me sad")
            }
        }   
    }
}

module.exports = createClient;