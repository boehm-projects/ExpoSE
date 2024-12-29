/* Copyright (c) Royal Holloway, University of London | Contact Blake Loring (blake@parsed.uk), Duncan Mitchell (Duncan.Mitchell.2015@rhul.ac.uk), or Johannes Kinder (johannes.kinder@rhul.ac.uk) for details or support | LICENSE.md for license details */

import Runner from "./Runner";


process.title = "ExpoSE Test Runner";

function getArgument(name, fallback=null) {

	for (let i = 0; i < process.argv.length; i++) {
		if (process.argv[i].split("=")[0] === name) {
			return process.argv[i].split("=")[1];
		}
	}
	if (fallback === null){
		console.log( "No value for mandatory argument provided\nPlease provide a value for the following arguments: \n\t --file");
		return "No optional field";
	}
	return fallback;
}



const concurrent = parseInt(getArgument("--concurrent", 4));

const iterations = parseInt(getArgument("--iterations", 10));
const file = getArgument("--file");
if (file === "No optional field") {
	process.exit(1);
}
console.log(`Launching stress test for file ${file} with max concurrent of ${concurrent} for ${iterations} iterations` );

new Runner(concurrent, iterations, file).start();