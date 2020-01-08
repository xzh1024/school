var myname: string = "xie zi han";

// var alias = "xixi";
var alias: any = "xixi";
alias = 13;

var age: number = 13;

var man: boolean = true;

function text1(): void {
    // 无返回值
}

function text2(): string {
    // 返回值是字符串类型
    return '';
}

function text3(name: string): string {
    // 参数字符串类型，返回值字符串类型
    return name;
}
text3('汤姆');


class Person {
    name: string;
    age: number
}

var zhangsan: Person = new Person();
zhangsan.name = "zhangsan";
zhangsan.age = 18;