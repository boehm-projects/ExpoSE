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
        this.req = undefined
    }

    // generateRequest() {

    //     this.req = new Request(
    //         "/post",
    //         "POST",
    //         {
    //           name: this.nameField,
    //          email: this.emailField,
    //          phone: this.phoneNumber
    //         },
    //         {},
    //         {}
    //     )
    //     return this.req
    // }
    generateRequest() {

        this.getUserInput()
        this.req = new Request(
            "/getById/" + S$.symbol("id", 1),
            "GET",
            {},
            {},
            {}
        )
        console.log(this.req)
        return this.req
    }

    // generate symbolic user input.
    getUserInput() {
        this.nameField = S$.symbol("name", this.nameField),
            this.emailField = S$.symbol("email", this.emailField),
            this.phoneNumber = S$.symbol("phoneNumber", this.phoneNumber)
    }



    doSomethingWithTheResponse(res) {
        if (res instanceof Response) {
            if (this.req.method === "POST") {
                if (res.statusCode === 100) {
                    console.log("just for testing")
                }
                if (res.statusCode === 200) {
                    let errors = 0
                    let fine = 0
                    if (res.body.data.name) {

                        console.log("Sanitized  " + res.body.data.name + " from " + this.nameField)
                        //S$.assert(res.body.data.name == this.nameField )
                        if (/[<>]/i.test(res.body.data.name) && this.nameField === res.body.data.name) {
                            errors += 1
                        }
                        else {
                            fine += 1
                        }
                    }
                    if (res.body.data.phone) {
                        console.log("Sanitized  " + res.body.data.phone + " from " + this.phoneNumber)
                        //S$.assert(res.body.data.name == this.phone )
                        if (/[<>]/i.test(res.body.data.phone) && this.phoneNumber === res.body.data.phone) {
                            errors += 1

                        }
                        else {
                            fine += 1

                        }
                    }
                    if (res.body.data.email) {
                        console.log("Sanitized  " + res.body.data.email + " from " + this.emailField)
                        //S$.assert(res.body.data.name == this.nameField )
                        if (/[<>]/i.test(res.body.data.email) && this.emailField === res.body.data.email) {
                            errors += 1

                        }
                        else {
                            fine += 1

                        }

                    }
                    if (errors >= 1) {

                        throw (`${errors} errors and ${fine} fine inputs`)
                    }
                    else {
                        throw ("All good")
                    }
                }
                else if (res.statusCode >= 400 && res.statusCode < 500) {
                    console.log("Test Returned error Response.")
                }
            }

            else if (this.req.method === "GET"){
                console.log(res)
                if (res.statusCode === 200) {
                    
                    if (/[<>]/i.test(res.body.data.data.email)) {
                        throw("THIS IS EVIL")
                    }
                    else {
                        throw("UP")
                    }
                }
            }
        }
    }
}

module.exports = createClient;