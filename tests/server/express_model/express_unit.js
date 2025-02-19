const S$ = require("S$");




function extractParams(template, actualPath) {
    // NON SYMBOLIC
    // Convert the path template into a regex. 
    const keyRegex = /:([^\s\/]+)/g;
    if (!keyRegex.test(template)) {
        // If there are no dynamic segments, we can directly compare the paths
        if (template === actualPath) { // This should not be reachable
            return { keys: [], values: [] }; // No parameters, match is found
        } else {
            return null; // No match found
        }
    }
    // Create the regex string for matching the actual path
    const regexString = template.replace(keyRegex, '([0-9]{1,3})');
    const regex = new RegExp(`^${regexString}$`);
    console.log(regex)
    // Extract keys from template
    const keys = [];
    var matches = template.match(keyRegex) // this has nothing symbolic
    matches.forEach(elem => keys.push(elem.slice(1)))
    console.log(keys)


    if (keys.length === 0) {
        return null
    }
    // SYMBOLIC PATH
    S$.assert(regex.test(actualPath), "Path does not match")
    // Check if a match is found 
    if (regex.test(actualPath)) {
        var pathMatch = actualPath.match(regex)
        const values = pathMatch.slice(1);
        return { keys, values }; // Return keys and corresponding values}
    }
    return null; // No match found


}


let template = "/:user"
let actualPath = S$.symbol("path", "/")


let res = extractParams(template, actualPath)

if (res === null) {
    console.log(actualPath)
    throw "path without"

}
else {
    if (res.values[0] === '12') {
        console.log(res)
        throw 'Uh'
    }
    if (res.values[0] === '13') {
        console.log(res)
        throw "ehhhhhhhhh?"
    }
}
