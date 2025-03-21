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
        this.nameField = "name"
        this.emailField = "name@name"
        this.phoneNumber = "089123"

    }
    generateRequest() {
        var url = S$.symbol("path", "/")
        //this.getUserInput()
        this.getUserInput()
        var req = new Request(
            url,
            HttpMethods[S$.symbol("method", 0)],
            {
              name: this.nameField,
             email: this.emailField,
             phone: this.phoneNumber
            },
            {},
            {}
        )

        // This requires knowledge of the server. 
        // Expose will not find a path containing any parameter (e.g. /user/abcd1234/),
        // but instead a path mirroring the path and its variable name (e.g. /user/:uuid)
        // Writing the path params into the http params object 
        // destroys the possibilty to find the correct path or would require extensive rewriting
        // if (req.url === "/user" && req.method === "GET") {
        //     let pathParam = S$.symbol("pathParam", "")
        //     const uuidRegex = /^[a-fA-F0-9]{8}$/
        //     const idRegex = /^[0-9]*$/
            
        //     if (idRegex.test(pathParam)) {
                
        //         req.url = req.url + "/" + pathParam
        //     }
        //     else if( uuidRegex.test(pathParam) ){
        //         req.url = req.url + "/" + pathParam
        //     }
        // }
        // console.log("url console " + req.url)

        return req
    }

    // generate symbolic user input.
    getUserInput() {
        this.nameField = S$.symbol("name", this.nameField),
            this.emailField = S$.symbol("email", this.emailField),
            this.phoneNumber = S$.symbol("phoneNumber", this.phoneNumber)
    }


   
    doSomethingWithTheResponse(res){
        if (res instanceof Response){
            if (res.statusCode === 100) {
                console.log("just for testing")
            }
            if (res.statusCode === 200) {
                if (res.body.data.name){
                    console.log("Why does it work but then throws an error?")
                    console.log("Sanitized name " + res.body.data.name + " from " + this.nameField)
                    //S$.assert(res.body.data.name == this.nameField )
                }
            }
            else if (res.statusCode >= 400 && res.statusCode < 500){
                console.log("Error Response. Something went wrong")
            }
        }   
    }
}

module.exports = createClient;