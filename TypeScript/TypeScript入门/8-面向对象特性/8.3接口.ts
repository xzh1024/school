//interface

interface IPerson {

    name: string,
    age: number

}

class Person83 {

    constructor(public config: IPerson) {

    }

}

var p83 = new Person83({
    name: "zhangsan",
    age: 18
});

console.log(p83.config);



interface Animal83 {
    eat();
}

class Sheep implements Animal83 {
    eat() {
        console.log("i eat grass");
    }
}

class Tiger implements Animal83 {
    eat() {
        console.log("i eat meat");
    }
}