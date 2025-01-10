const { Response } = require("../response");



module.exports = createApplication;

function createApplication() {
    let app = new Application()

    return app;
}


class Application {
    constructor() {
        this.port = null
        this.dataMap = {}
        this.baseRouting = {}
    }

    listen(key, callbackparam, clientData) {
        // e.g "/get" gets split into
        // Array [ "", "get" ]
        let reqPath= clientData.url.split("/")  
        // Array [ "/", "/get" ] = baseUrl and subrouting
        let paths = reqPath.map(elem => "/" + elem)
        let routingPath = ''

        const basePath = paths[0]
        if (paths.length > 1 ){
              routingPath = paths[1]
        }
        else{
              routingPath = paths[0]
        }
        let router = this.baseRouting[basePath]


        let res = new Response()

        if (router === undefined || clientData.method === '') {
            res.setHeader("Content-Type", "text/plain");
            res.writeHead(403);
            res.end("Invalid request");
            return res;
        }
        console.log(router.routingObject)
        router.routingObject[routingPath][clientData.method](clientData, res)
    }
    set(key, value) {
        console.log("setting")
        this.dataMap[key] = value
    }

    get(key) {
        console.log("getting")
        return this.dataMap[key]

    }

    use(key, router) {
        console.log("getting")

        this.baseRouting[key] = router

    }

}

