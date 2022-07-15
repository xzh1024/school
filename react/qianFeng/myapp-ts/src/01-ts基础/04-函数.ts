function text1(a: string, b: string, c?: number): string {
  return a.substring(0, 1) + b.substring(0, 2);
}

var myName = text1('aaa', 'bbb');
console.log(myName);

/* ---------------------- */

interface IFunc {
  (a: string, b: string, c?: number): string;
}

// var myFunc2: IFunc = text1;
var myFunc2: IFunc = function text1(a: string, b: string, c?: number): string {
  return a.substring(0, 1) + b.substring(0, 2);
};

/* ---------------------- */

interface Iobj {
  name: string;
  age: number;
  getName: (name: string) => string;
}

var obj: Iobj = {
  name: '张三',
  age: 100,
  getName: (name: string) => {
    return name;
  },
};

export default {};
