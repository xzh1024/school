function func61() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    args.forEach(function (arg) {
        console.log(arg);
    });
}
func61(1, 2, 3);
func61(7, 8, 9, 10, 11);
function func62(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
}
var args = [1, 2, 3];
// func62(...args)
var args2 = [7, 8, 9, 10];
// func62(...args2)
