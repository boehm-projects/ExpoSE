/* Copyright (c) Royal Holloway, University of London | Contact Blake Loring (blake@parsed.uk), Duncan Mitchell (Duncan.Mitchell.2015@rhul.ac.uk), or Johannes Kinder (johannes.kinder@rhul.ac.uk) for details or support | LICENSE.md for license details */



import {spawn} from "child_process";

const EXPOSE_TEST_SCRIPT = "./expoSE";

class Tester {

	constructor(file, iteration) {
		this.file = file;
		this.iteration = iteration;
		this.out = "";
		this.extraErrors = 0;
		this.inputs = []
	}

	build(done) {


		let env = process.env;
		env.EXPOSE_EXPECTED_PC = this.file.expectPaths;
		let prc = spawn(EXPOSE_TEST_SCRIPT, [this.file.path], {
			env: env
		});

		prc.stdout.setEncoding("utf8");
		prc.stdout.on("data", data => {
			if (data === "Response gave error , so it worked but not really :)"){
				this.extraErrors += 1;
				this.file.expectErrors +=1;
			}
			if(data.startsWith("[PRINT]")){
				let noPrint = data.split('[PRINT]')[1]
				let onlyObject = JSON.parse(noPrint.split('\n')[0])
				this.inputs.push(onlyObject)
			}
			this.out += data.toString()
		});
		let startTime = Date.now();

		const SECOND = 1000;
		const TIME_WARNING = 60;

		let longRunningMessage = undefined;

		let ref = this;

		function queueTimeout() {
			longRunningMessage = setTimeout(() => {
				console.log(`\r${ref.file.path} #${ref.iteration} has taken ${(Date.now() - startTime) / 1000}s to run`);
				queueTimeout();
			}, TIME_WARNING * SECOND);
		}

		queueTimeout();	

		prc.on("close", code => {
			clearTimeout(longRunningMessage);
			done(code, Date.now() - startTime);
		});
	}
}

export default Tester;
