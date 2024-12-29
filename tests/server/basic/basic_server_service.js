
class BasicService {
	constructor(){}

	fetchData(data){
		if (/^a?b?c?$/.test(data)) {
			return "fetching data 1";
		}
		return "fetching data 2";
	}

}

module.exports = {BasicService};