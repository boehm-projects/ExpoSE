import HttpMethods from "./http_methods.enum"
class Router {
    
    constructor(){this.routingObject = {}}

    get(key, callback){
        if (this.routingObject[key]=== undefined){ 
            this.routingObject[key] = {}
        }
        this.routingObject[key][HttpMethods[0]] = callback
    }
    put(key, callback){
        if (this.routingObject[key]=== undefined){ 
            this.routingObject[key] = {}
        }
        this.routingObject[key][HttpMethods[2]] = callback
    }

    delete(key, callback){
        if (this.routingObject[key]=== undefined){ 
            this.routingObject[key] = {}
        }
        this.routingObject[key][HttpMethods[4]] = callback
    }
    post(key, callback){
        if (this.routingObject[key]=== undefined){ 
            this.routingObject[key] = {}
        }
        this.routingObject[key][HttpMethods[1]] = callback

    }
// routingObject = { }



}

module.exports = createRouter;

function createRouter(){
    let router = new Router()
     
    return router;
}
