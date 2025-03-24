var S$ = require('S$');
var x = +S$.symbol("X", "1");
if(x > 2){
    throw "no"
}
else if (x <= 1){

    throw "yes"
}