// Non persistent mock database
export class MockoDB{
    constructor(){
        this.db = {}
        this.createTable("user")
    }
}

MockoDB.prototype.createTable = function(key){
    if (this.db[key] == undefined ){
        this.db[key] = [
            {
                name: "name",
                email: "name@name",
                phone: "089123455"
            },{
                name: "<>>",
                email: ">>>@>M",
                phone: "<><>>"
            }
        ]
    }
}

MockoDB.prototype.getTable = function(key){
    return this.db[key]
}

MockoDB.prototype.createEntry = function(key, entry){
    let index
    if(this.db[key] != undefined){
        this.db[key].push(entry)
        index = this.db[key].length-1

    }
    else {
        this.createTable(key)
        this.createEntry(key, entry)
    }
    return index
}

MockoDB.prototype.getEntry = function(key, index){
    console.log(this.db[key])
    let dbEntry = null
    if(this.db[key][index]){
        dbEntry = this.db[key][index]

    
    }
    return dbEntry 
}

MockoDB.prototype.findByField = function(key, field, data){

    let entry = this.db[key].map((item, index) => ({ item, index })) // Create an array of items with their indices
        .filter(entry => entry.item[field] == data);
     return entry[0]

}
// keep indices consistent
MockoDB.prototype.deleteEntry = function(key, index){ 
    let success = false
    if (index in this.db[key]){
        this.db[key][index] = undefined
        success = true
    }
    return success
}

MockoDB.prototype.updateEntry = function(key, id, data){ 

    let index = id
    console.log(index)
    if(this.db[key].length-1 > index){
        return null
    }
    let state = this.getEntry(key,index)
   
    
    if(state !== null){
        this.db[key][index] = data
        state = this.db[key][index]
        return state
    }
    else{
        return state

    }
     
}