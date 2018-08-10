var x = S$.symbol("X", '');

if (/^he*llo_world*$/.test(x)) {
	if (x == 'heello_worlddddd') throw 'Reachable';
	if (x == 'hllo_worl') throw 'Reachable';
	if (x == '') throw 'Unreachable';
	throw 'Reachable';
}

if (/^(hello)*(world)*$/.test(x)) {
	if (x == '') throw 'Reachable';
	if (x == 'hellohelloworld') throw 'Reachable';
	if (x == 'd') throw 'Unreachable';
	if (x == 'hellohelloworl') throw 'Unreachable';
	if (x == 'worldworldworld') throw 'Reachable';
	throw 'Reachable';
}