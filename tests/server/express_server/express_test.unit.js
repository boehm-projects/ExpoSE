const S$ = require("S$");
import { Response } from "../response.js";
import { Request } from "../request.js";

var c = require('./express_controller.js')
let controller = new c.ExpressController()



// Test the controller functions individually.
function start_test() {
    let data = S$.symbol("client_data_", "");
    let queryParams = { id: S$.symbol("req_id_") };
    let request = new Request(null, null,
        data,
        queryParams);
    const response = new Response();
    for (let func of controller.prototype.methods) {
        func(request, response)
    }
}

start_test()