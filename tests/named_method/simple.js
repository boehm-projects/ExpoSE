/* Copyright (c) Royal Holloway, University of London | Contact Blake Loring (blake@parsed.uk), Duncan Mitchell (Duncan.Mitchell.2015@rhul.ac.uk), or Johannes Kinder (johannes.kinder@rhul.ac.uk) for details or support | LICENSE.md for license details */
const S$ = require("S$")

var x = S$.symbol("val")
function g(x) {
	if (x < 0){
		x=-x;}
	else {
		if (x === 0){
			x=1;}
		x = x + 1;
	}
	if (!(x >0)){
		x =-1;}
}
g(x)
