const db = require("./express_db.mock")


module.exports.createService = createService;

function createService() {
    const service = new UserService()
    return service
}

const entityMap = {
    // '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    // '"': '&quot;',
    // "'": '&#39;',
    // '/': '&#x2F;',
    // '`': '&#x60;',
    // '=': '&#x3D;',
};


class UserService {
    constructor() {
        this.db = new db.MockoDB()
    }

    createUser(data) {
        if (this.db.user === undefined) {
            this.db.createTable("user")
        }
        let userIdx = this.db.createEntry("user", data)
        let newUser = this.db.getEntry("user", userIdx)
        console.log(newUser)
        return newUser

    }
    createUserSanitized(data) {
        Object.keys(data).forEach(key => {
            data[key] = this.escapeHtml(data[key]);
        });
        let userIdx = this.db.createEntry("user", data)
        let newUser = this.db.getEntry("user", userIdx)
        console.log(newUser)
        return newUser
    }

    findUserByField(data) {
        let field = Object.keys(data)[0]
        let value = Object.values(data)[0]
        let user = this.db.findByField("user", field, value)
        if (user) {
            return user
        }
        else {
            return null;
        }
    }

    getUser(id) {
        let user = this.db.getEntry("user", id)
        if (user !== null) {
            return user
        }
        return null
    }
    getUsers(){
        return this.db.getTable("user")
    }

    deleteUser(id) {
        return this.db.deleteEntry("user", id) ? true : false;
    }

    patchUser(id, data){
        return this.db.updateEntry("user", id, data)
    }



    escapeHtml(string) {
        return String(string).replace(/[<>]/g, function (s) {
            return entityMap[s];
          });
    }
}

