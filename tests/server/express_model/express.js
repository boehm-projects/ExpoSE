const { Response } = require("../response");
const { default: HttpMethods } = require("./http_methods.enum");

const S$ = require("S$");



module.exports.createApplication = createApplication;

module.exports.createRouter = createRouter;

function createApplication() {
    let app = new Application()
    return app;
}


class Application {
    constructor() {
        this.port = null
        this.dataMap = {}
        this.stack = []
    }

    listen(key, callbackparam, req) {
        var res = new Response()
        console.log(req)
        this.handleStack(req, res)

        return res
    }
    set(key, value) {
        this.dataMap[key] = value
    }

    get(key, callback) {
        if (callback) {
            let objectBuilder = {}
            let routerObjectValue = {
                "path": key,
            }
            objectBuilder["route"] = routerObjectValue
            objectBuilder["path"] = key
            objectBuilder["handle"] = callback
            objectBuilder["method"] = "GET";
            console.log("we made it here")
            this.stack.push(objectBuilder)
        }
        else {
            return this.dataMap[key]
        }

    }
    put(key, callback) {
        let objectBuilder = {}
        let routerObjectValue = {
            "path": key,
        }
        objectBuilder["route"] = routerObjectValue
        objectBuilder["path"] = key
        objectBuilder["handle"] = callback
        objectBuilder["method"] = "PUT";
        this.stack.push(objectBuilder)
    }

    delete(key, callback) {
        let objectBuilder = {}
        let routerObjectValue = {
            "path": key,
        }
        objectBuilder["route"] = routerObjectValue
        objectBuilder["path"] = key
        objectBuilder["handle"] = callback
        objectBuilder["method"] = "DELETE";
        this.stack.push(objectBuilder)
    }
    post(key, callback) {
        let objectBuilder = {}
        let routerObjectValue = {
            "path": key,
        }
        objectBuilder["route"] = routerObjectValue
        objectBuilder["path"] = key
        objectBuilder["handle"] = callback
        objectBuilder["method"] = "POST";
        this.stack.push(objectBuilder)

    }
    next() {
        return
    }


    use() {
        if (arguments.length > 1 && arguments[1] instanceof Router) {
            let basePath = arguments[0]
            if(basePath === "/"){
                basePath = ""
            }
            for (const [key, value] of Object.entries(arguments[1].routingObject)) {
                for (const [routekey, routevalue] of Object.entries(value.methods)) {
                    // add path of routerobject to route on the stack
                    let objectBuilder = {}
                    let routerObjectValue = {
                        "path": key,
                    }
                    objectBuilder["route"] = deepMerge(routerObjectValue, value)
                    objectBuilder["path"] = basePath  + key;
                    objectBuilder["handle"] = value[routekey];
                    objectBuilder["method"] = routekey;
                    this.stack.push(objectBuilder)
                }
            }
        }
        else if (typeof arguments[0] == "string" && arguments.length === 2) {
            let objectBuilder = {}
            objectBuilder["path"] = "/";
            objectBuilder["handle"] = arguments[1];
            objectBuilder["method"] = "use";
            objectBuilder["route"] = null;
            this.stack.push(objectBuilder)
        }
        else if (typeof arguments[0] == "string" && arguments.length > 2) {

            for (var i = 1; i < arguments.length; i++) {
                let objectBuilder = {}
                objectBuilder["path"] = "/";
                objectBuilder["handle"] = arguments[i];
                objectBuilder["method"] = "use";
                objectBuilder["route"] = null;
                this.stack.push(objectBuilder)
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                let objectBuilder = {}
                objectBuilder["path"] = "/"
                objectBuilder["handle"] = arguments[i]
                objectBuilder["route"] = null;
                objectBuilder["method"] = "use";
                this.stack.push(objectBuilder)
            }
        }
    }

    handleStack(req, res) {
        if ((req.url || req.method) === undefined || !HttpMethods.includes(req.method)) {
            res.setHeader("Content-Type", "text/plain");
            res.writeHead(400);
            res.end("Invalid request. Missing URL or Method");
            return res
        }
        let foundCorrectPath = false

        this.stack.forEach(
            middleWare => {
                if (middleWare.method === "use") {
                    middleWare.handle(req, res, this.next)
                }

                if (middleWare.method == req.method && foundCorrectPath === false) {

                    let path = middleWare.path

                    // are there any path attributes? e.g. /:id 
                    const pathValues = extractParams(path, req.url)// /:id/:uuid  and /1/ab21e1e
                    if (!pathValues.hasParams ) {
                        // route is static
                        if(req.url === path){
                            middleWare.handle(req, res, this.next)
                            foundCorrectPath = true
                            return
                        }
                        // wrong route all together
                        return; // stop further processing

                    }
                    else {
                        const { keys, values } = pathValues.params ;

                        keys.forEach((key, index) => {
                            if (req.params == undefined) {
                                req.params = {}
                            }
                            if (req.params[key] == undefined) {
                                req.params[key] = "";
                            }
                            req.params[key] = values[index];

                        })
                        if (matchParametrizedPath(path, req.url)) {
                            middleWare.handle(req, res, this.next)
                            foundCorrectPath = true;
                            return;
                        }
                        ret 
                    }
                    

                }
            }
        )
        if (!foundCorrectPath) {
            res.setHeader("Content-Type", "text/plain");
            res.writeHead(400);
            res.end("Invalid request. Your request cannot be processed");
        }
        return res;
    }

}

function createRouter() {
    let r = new Router()
    return r;
}
class Router {
    /**
     * TODO merge multiple routers
     * 
     * @param {Object} mergeParams 
     */
    constructor(params = { mergeParams: false }) {
        this.routingObject = {}
        this.params = params
    }

    get(key, callback) {
        if (this.routingObject[key] === undefined) {
            this.routingObject[key] = {}
            this.routingObject[key]["methods"] = {}
        }
        this.routingObject[key]["methods"][HttpMethods[0]] = true
        this.routingObject[key][HttpMethods[0]] = callback
    }
    put(key, callback) {
        if (this.routingObject[key] === undefined) {
            this.routingObject[key] = {}
            this.routingObject[key]["methods"] = {}
        }
        this.routingObject[key]["methods"][HttpMethods[2]] = true
        this.routingObject[key][HttpMethods[2]] = callback
    }

    delete(key, callback) {
        if (this.routingObject[key] === undefined) {
            this.routingObject[key] = {}
            this.routingObject[key]["methods"] = {}
        }
        this.routingObject[key]["methods"][HttpMethods[4]] = true
        this.routingObject[key][HttpMethods[4]] = callback
    }
    post(key, callback) {
        if (this.routingObject[key] === undefined) {
            this.routingObject[key] = {}
            this.routingObject[key]["methods"] = {}
        }
        this.routingObject[key]["methods"][HttpMethods[1]] = true
        this.routingObject[key][HttpMethods[1]] = callback

    }
}


// This is a function to wurschtel two object zsam
function deepMerge(obj1, obj2) {
    for (var p in obj2) {
        try {
            if (obj2[p].constructor == Object) {
                obj1[p] = deepMerge(obj1[p], obj2[p]);
            } else {
                obj1[p] = obj2[p];
            }
        } catch (e) {
            obj1[p] = obj2[p];
        }
    }
    return obj1;
}



function hasParams(template) {
    const keyRegex = /:([^\s/]+)/g;
    if (!keyRegex.test(template)) {
        return false
    }
    return true
}

function matchParametrizedPath(template, actualPath) {
    console.log(hasParams(template))
    if (!hasParams(template)) {
        return false
    }
    // Create the regex string for matching the actual path
    const keyRegex = /:([^\s/]+)/g;

    const regexString = template.replace(keyRegex, "[0-9]+");
    const regex = new RegExp(`^${regexString}$`);

    // Execute the regex on the actual path
    if (regex.test(actualPath)) {
        return true
    }

    return false;
}

function extractParams(template, actualPath) {
    // NON SYMBOLIC
    // Convert the path template into a regex. 
    const keyRegex = /:([^\s\/]+)/g;
    if (!keyRegex.test(template)) {
        return { params: null, hasParams: false}; // Template has no parameters
    }
    // Create the regex string for matching the actual path
    const regexString = template.replace(keyRegex, '([0-9]{1,3})');
    try {
        const regex = new RegExp(`^${regexString}$`);
        if (!regex.match(actualPath)) {
            return { params: null, hasParams: false}
        }
        // Extract keys from template
        const keys = [];
        var matches = template.match(keyRegex) // this has nothing symbolic
        matches.forEach(elem => keys.push(elem.slice(1)))
        console.log(keys)

        // SYMBOLIC PATH
        S$.assert(regex.test(actualPath), "Path does not match")

        // Check if a match is found 
        if (regex.test(actualPath)) {
            var pathMatch = actualPath.match(regex)
            const values = pathMatch.slice(1);
            console.log({ keys, values })
            return{ params: { keys, values }, hasParams: true}; // Return keys and corresponding values}
        }

    } catch (error) {

        console.error("Invalid regex pattern", error);

        return null; // Handle the error gracefully

    }
    return { params: null, hasParams: false}; // No match found



}


