let sym = Symbol();

let obj = {
    [sym]: "value"
};

console.log(obj[sym]); // "value"