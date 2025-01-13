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
        let res = new Response() 
        this.handleStack(req, res) 
        return res
    }
    set(key, value) {
        this.dataMap[key] = value
    }

    get(key) {
        return this.dataMap[key]
    }



    use() {
        if (arguments.length > 1 && arguments[1] instanceof Router) {
            
            for (const [key, value] of Object.entries(arguments[1].routingObject)) {
                for (const [routekey, routevalue] of Object.entries(value.methods)) {
                    // add path of routerobject to route on the stack
                    let objectBuilder = {}
                    let routerObjectValue = {
                        "path": key,
                    }
                    objectBuilder["route"] = deepMerge(routerObjectValue, value)
                    objectBuilder["path"] = arguments[0];
                    objectBuilder["handle"] = value[routekey];
                    objectBuilder["method"] = routekey;
                    this.stack.push(objectBuilder)
                } 
            }
        }
        else if (typeof arguments[0] == "string" && arguments.length === 2) {
            let objectBuilder = {}
            objectBuilder["path"] = arguments[0];
            objectBuilder["handle"] = arguments[1];
            objectBuilder["method"] = "use";
            objectBuilder["route"] = null;
            this.stack.push(objectBuilder)
        }
        else if (typeof arguments[0] == "string" && arguments.length > 2) {

            for (var i = 1; i < arguments.length; i++) {
                let objectBuilder = {}
                objectBuilder["path"] = arguments[0];
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
        if (req.url === undefined || !HttpMethods.includes(req.method)) {
            res.setHeader("Content-Type", "text/plain");
            res.writeHead(403);
            res.end("Invalid request");
            return res
        }
        let foundCorrectPath = false


        

        this.stack.forEach(
            middleWare => {
                if (middleWare.method === "use")
                {
                    middleWare.handle(req,res) 
                }
                if(middleWare.method === req.method ){
                    // are there any path attributes? e.g. /:id 
                    var template = middleWare.route.path;
                    const pathValues  = extractParams(template, req.url)// /:id/:uuid  and /1/ab21e1a
                    if (pathValues !== null) { 
                        const {keys, values } = pathValues;
                        keys.forEach((key, index) =>{
                            if(req.params === undefined){ 
                                req.params = {}
                            }
                            req.params[key] = values[index]
                        })
                    }
                    if (matchParametrizedPath(template, req.url)){
                        middleWare.handle(req,res) 
                        foundCorrectPath = true
                    }
                }
            }
        )
        if (!foundCorrectPath){
            res.setHeader("Content-Type", "text/plain");
            res.writeHead(403);
            res.end("Invalid request");
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
     * TODO merge
     * 
     * @param {Object} mergeParams 
     */
    constructor(params = { mergeParams: false }) {
        this.routingObject = {}
        this.parms = params
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

function deepMerge(obj1, obj2) {

    for (var p in obj2) {
      try {
        // Property in destination object set; update its value.
        if ( obj2[p].constructor==Object ) {
          obj1[p] = deepMerge(obj1[p], obj2[p]);
  
        } else {
          obj1[p] = obj2[p];
  
        }
  
      } catch(e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
  
      }
    }
  
    return obj1;
}



function matchParametrizedPath(template, actualPath){ 
    const keyRegex = /:([^\s/]+)/g; 

    // Create the regex string for matching the actual path
    const regexString = template.replace(keyRegex,'([^/]+)');
    const regex = new RegExp(`^${regexString}$`);
// Execute the regex on the actual path
    const pathMatch = actualPath.match(regex);
    return pathMatch
}


function extractParams(template, actualPath) {

    // Convert the path template into a regex
    const keyRegex = /:([^\s/]+)/g; 

    // Create the regex string for matching the actual path
    const regexString = template.replace(keyRegex,'([^/]+)');
    const regex = new RegExp(`^${regexString}$`);

    // Extract keys from template
    const keys = [];
    let match;
    while ((match = keyRegex.exec(template)) !== null) {
        keys.push(match[1]);
    }


    // Execute the regex on the actual path
    const pathMatch = actualPath.match(regex);


    // Check if a match is found
    if (pathMatch) {
        if(pathMatch === "undefined"){
            return null;
        }
        const values = pathMatch.slice(1); // Exclude the full match
        return { keys, values }; // Return keys and corresponding values
    } else {
        return null; // No match found
    }
}


/*
RoutingObject = 
{
    "/item" : {
        "get": function,
        "put": putfunc
    },
    "/sthelse": { 
        "get": someotherfunction,
        "post": somePostFunction
    }
    // new idea 
    "/item" : {
        methods: {
            get: true,
            put: true
        },
        get: function,
        put: putfunction
        },
    "/sthelse": { 
        "get": someotherfunction,
        "post": somePostFunction
    }
}
*/

