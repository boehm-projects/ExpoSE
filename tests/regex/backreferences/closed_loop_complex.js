//Test a looped bref on a closed capture looped inside a capture

var x = S$.symbol("X", '');

if (/^(.)(\1b)+$/.test(x)) {

	if (x == 'aab') {
		throw 'Reachable';
	}

	throw 'Reachable';
}