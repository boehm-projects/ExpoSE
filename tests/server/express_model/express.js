const { Response } = require("../response");
const { default: HttpMethods } = require("./http_methods.enum");


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
        res.setHeader("Content-Type", "text/plain");
        res.writeHead(400);
        res.end("Invalid request. Your request cannot be processed");
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
                "params": {
                    [HttpMethods[0]] : _extractParamsKeys(key)
                }
            }
            objectBuilder["route"] = routerObjectValue
            objectBuilder["path"] =  this._generateRegex(key);
            objectBuilder["handle"] = callback
            objectBuilder["method"] =HttpMethods[0];
            this.stack.push(objectBuilder)
            console.log(objectBuilder)
        }
        else {
            return this.dataMap[key]
        }

    }
    put(key, callback) {
        let objectBuilder = {}
        let routerObjectValue = {
            "path": key,               
            "params": {
                    [HttpMethods[2]] : _extractParamsKeys(key)
                }
        }
        objectBuilder["route"] = routerObjectValue
        objectBuilder["path"] =  this._generateRegex(key);
        objectBuilder["handle"] = callback
        objectBuilder["method"] = HttpMethods[2];
        this.stack.push(objectBuilder)
    }
    patch(key, callback) {
        let objectBuilder = {}
        let routerObjectValue = {
            "path": key,               
            "params": {
                    [HttpMethods[3]] : _extractParamsKeys(key)
                }
        }
        objectBuilder["route"] = routerObjectValue
        objectBuilder["path"] =  this._generateRegex(key);
        objectBuilder["handle"] = callback
        objectBuilder["method"] = HttpMethods[3];
        this.stack.push(objectBuilder)
    }
    delete(key, callback) {
        let objectBuilder = {}
            objectBuilder["params"] = {};
        let routerObjectValue = {
            "path": key,                
            "params": {
                    [HttpMethods[4]] : _extractParamsKeys(key)
                }
        }
        objectBuilder["route"] = routerObjectValue
        objectBuilder["path"] = this._generateRegex(key);
        objectBuilder["handle"] = callback
        objectBuilder["method"] = HttpMethods[4];
        this.stack.push(objectBuilder)
    }
    post(key, callback) {
        let objectBuilder = {}
        let routerObjectValue = {
            "path": key,                
            "params": {
                    [HttpMethods[1]] : _extractParamsKeys(key)
                }
        }
        objectBuilder["route"] = routerObjectValue
        objectBuilder["path"] = this._generateRegex(key);
        objectBuilder["handle"] = callback
        objectBuilder["method"] = HttpMethods[1];
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
                    objectBuilder["route"] = _deepMerge(routerObjectValue, value)
                    objectBuilder["path"] = this._generateRegex(basePath ,key);
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
                    return
                }
                if (middleWare.method == req.method && foundCorrectPath === false) {
                    const match = middleWare.path.test(req.url)
                    if(match){
                        // no params on this path
                        if(middleWare.route.params[middleWare.method].length === 0){
                            foundCorrectPath = true
                            middleWare.handle(req, res, this.next)
                            return // stop further processing
                        }
                        var pathMatch = req.url.match(middleWare.path)
                        const values = pathMatch.slice(1);
                        middleWare.route.params[middleWare.method].forEach((key, index) => {
                            if (req.params == undefined) {
                                req.params = {}
                            }
                            if (req.params[key] == undefined) {
                                req.params[key] = "";
                            }
     // This is a hack, to convert string to int, as expoSE does not model the conversion outside of the unary functions minus and plus.
                            req.params[key] = (+values[index])
                        })
                        foundCorrectPath = true
                        middleWare.handle(req, res, this.next)
                        return // stop further processing
                    }
                    else{
                        return
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

    _generateRegex(){
        var regexString = ""
        for (var i = 0; i < arguments.length; i++) {
            if(hasParams(arguments[i])){
                const keyRegex = /:([^\s\/]+)/g;
                // Create the regex string for matching the actual path
                regexString += arguments[i].replace(keyRegex, '(\\d{1,4})');
            }
            else{
                regexString += arguments[i]
            }

        }
        return new RegExp(`^${regexString}$`)
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
            this.routingObject[key]["params"] = {}
        }
        this.routingObject[key]["params"][HttpMethods[0]] = _extractParamsKeys(key)
        this.routingObject[key]["methods"][HttpMethods[0]] = true
        this.routingObject[key][HttpMethods[0]] = callback
    }
    put(key, callback) {
        if (this.routingObject[key] === undefined) {
            this.routingObject[key] = {}
            this.routingObject[key]["methods"] = {}
            this.routingObject[key]["params"] = {}

        }
        this.routingObject[key]["params"][HttpMethods[2]] = _extractParamsKeys(key)
        this.routingObject[key]["methods"][HttpMethods[2]] = true
        this.routingObject[key][HttpMethods[2]] = callback
    }

    delete(key, callback) {
        if (this.routingObject[key] === undefined) {
            this.routingObject[key] = {}
            this.routingObject[key]["methods"] = {}
            this.routingObject[key]["params"] = {}

        }
        this.routingObject[key]["params"][HttpMethods[4]] = _extractParamsKeys(key)
        this.routingObject[key]["methods"][HttpMethods[4]] = true
        this.routingObject[key][HttpMethods[4]] = callback
    }
    patch(key, callback) {
        if (this.routingObject[key] === undefined) {
            this.routingObject[key] = {}
            this.routingObject[key]["methods"] = {}
            this.routingObject[key]["params"] = {}

        }
        this.routingObject[key]["params"][HttpMethods[3]] = _extractParamsKeys(key)
        this.routingObject[key]["methods"][HttpMethods[3]] = true
        this.routingObject[key][HttpMethods[3]] = callback
    }
    post(key, callback) {
        if (this.routingObject[key] === undefined) {
            this.routingObject[key] = {}
            this.routingObject[key]["methods"] = {}
            this.routingObject[key]["params"] = {}

        }
        this.routingObject[key]["params"][HttpMethods[1]] = _extractParamsKeys(key)
        this.routingObject[key]["methods"][HttpMethods[1]] = true
        this.routingObject[key][HttpMethods[1]] = callback

    }

  
}


// This is a function to wurschtel two object zsam
function _deepMerge(obj1, obj2) {
    for (var p in obj2) {
        try {
            if (obj2[p].constructor == Object) {
                obj1[p] = _deepMerge(obj1[p], obj2[p]);
            } else {
                obj1[p] = obj2[p];
            }
        } catch (e) {
            obj1[p] = obj2[p];
        }
    }
    return obj1;
}


function _extractParamsKeys(template){
    const keyRegex = /:([^\s\/]+)/g;
    const keys = [];
    var matches = template.match(keyRegex) // this has nothing symbolic
    if(!matches){
        return keys
    }
    matches.forEach(elem => keys.push(elem.slice(1)))
    return keys
}
function hasParams(template) {
    const keyRegex = /:([^\s/]+)/g;
    if (!keyRegex.test(template)) {
        return false
    }
    return true
}
