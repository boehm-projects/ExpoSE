//Tests a replace on a non global regex

var x = symbolic X initial '';
var b = /(a|b)/;

if (x.replace(b, 'Test') == 'Test') {

	if (x.indexOf('a') != -1) {
		throw 'Reachable';
	}

	if (x.indexOf('b') != -1) {
		throw 'Reachable';
	}

	throw 'Reachable';
}