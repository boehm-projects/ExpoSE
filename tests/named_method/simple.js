/* Copyright (c) Royal Holloway, University of London | Contact Blake Loring (blake@parsed.uk), Duncan Mitchell (Duncan.Mitchell.2015@rhul.ac.uk), or Johannes Kinder (johannes.kinder@rhul.ac.uk) for details or support | LICENSE.md for license details */
const S$ = require("S$")

var x = S$.symbol("x", 1)
var y = S$.symbol("y", 0)

function g(x, y) {
	if (x !== y){
		x += y
	}
	else {
		if (y > 8){
			y+=1
		}
	}
	x += 1
	if (x != 0 )
	{
		if( y != 0){
			x = y
		}
	}
}
// const s$ = require("s$");
    

// let x = s$.symbol("value", 0); 
// let y = s$.symbol("multiplier", 2);

// if (x > 0) {
// 	s$.assert(x*y > x, "assertion violation"); 
// }
console.log(g(x,y ))