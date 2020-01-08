var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
function test42(template, name, age) {
    console.log(template);
    console.log(name);
    console.log(age);
}
var myname = "xiezihan";
var getAge = function () {
    return 18;
};
test42(__makeTemplateObject(["hello my name is ", ", i'm ", ""], ["hello my name is ", ", i'm ", ""]), myname, getAge());
