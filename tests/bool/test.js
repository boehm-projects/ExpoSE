const S$ = require("S$");

let x = S$.symbol("X");
function g(x){
	if (x < 0) {
		x = -x;
	} else {
		if (x === 0) {
			x = 1;
		}
		x = x + 1;
	}
	if (!x > 0) {
		x = -1;
	}
	return x;
}

console.log(g(x));

