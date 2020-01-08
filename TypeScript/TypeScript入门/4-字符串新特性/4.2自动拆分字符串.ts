function test42(template, name, age) {
    console.log(template);
    console.log(name);
    console.log(age);
}

var myname = "xiezihan";

var getAge = function () {
    return 18;
}

test42`hello my name is ${myname}, i'm ${getAge()}`