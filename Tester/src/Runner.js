/* Copyright (c) Royal Holloway, University of London | Contact Blake Loring (blake@parsed.uk), Duncan Mitchell (Duncan.Mitchell.2015@rhul.ac.uk), or Johannes Kinder (johannes.kinder@rhul.ac.uk) for details or support | LICENSE.md for license details */



import Tester from "./Tester";
import * as http from "node:http";

class Runner {

	constructor(maxConcurrent, iterations, file){
		this.file = file;
		this.cbs = [];
		this._iteration = 0;
		this._total = iterations;
		this._maxConcurrent = maxConcurrent;
	}

	start() {
		this._errors = 0;
		this._running = 0;
		this._times = [];
		this.startTesting();
		return this;
	}

	done(cb) {
		this.cbs.push(cb);
		return this;
	}

	startTesting() {

		this.done = 0;


		//Start the tests
		if (this._running < this._maxConcurrent){
			this.startNext();
		}
	}

	startNext() {
		if (this._iteration < this._total) {
			while(this._running < this._maxConcurrent){
				this._iteration++;
				this.testFile(this.file);
			}
		}
	}

	postTest() {

		this._running--;

		//Start any remaining queued
		this.startNext();

		//If finished print output
		if (this._running === 0) {
			this.finishedTesting();
		}
	}

	_printStatus() {
		process.stdout.write("\r*** [" + this.done + "/" + this._total +"] [" + this._running + " running] [" + this._errors + " errors] ***\n");
	}

	finishedTesting() {
		console.log("\n**************************");
		console.log("*         Summary        *");
		console.log("**************************");
		console.log("*        " + this.done + " complete     *");
		console.log("*        " + this._errors + " errors        *");
		console.log("**************************");

		this._times.forEach((time) => {
			console.log(`* ${time}`);
		});

		this.cbs.forEach(cb => cb(this._errors));
	}

	_testFileDone(test, code, time, file) {
		this.done++;
		this._printStatus();
		if (code !== file.expectErrors) {
			process.stderr.write("\n" + file + " failed with errors (" + code + "). Printing output\n");
			process.stderr.write(test.out + "\n");
			this._errors++;
		}

		this._times.push(`${file.path} took ${time / 1000}s`);

		this.postTest();
	}

	testFile(file) {
		this._running++;
		this._printStatus();

		let test = new Tester(file, this._iteration);
		test.build((code, time) => this._testFileDone(test, code, time, file));
	}


}

export default Runner;
