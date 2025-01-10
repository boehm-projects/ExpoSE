
class BasicService {
	constructor(){}

	fetchData(data){
		if (/^[a?b?c?]$/.test(data)) {
			return "fetching data 1";
		}
		else{
			return "fetching data 2";
		}
	}

	getById(id){ 
		var arr = ["uno", "due", "tre", "quatro"]
		return arr[id]
	}
}

module.exports = {BasicService};