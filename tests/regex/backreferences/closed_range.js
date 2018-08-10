//Test a single backreference of a closed capture group

var x = S$.symbol("X", '');

if (/^([ab])\1([ab])\2([ab])\1$/.test(x)) {
	if (x == 'aabbba') throw 'Reachable';
	if (x == 'abaaaa') throw 'Unreachable';
	throw 'Reachable';
}