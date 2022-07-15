interface Ifunc {
  // getName: Function;
  getName: () => string;
}

class A implements Ifunc {
  a1() {}
  a2() {}
  getName() {
    return 'AAA';
  }
}
class B implements Ifunc {
  b1() {}
  B2() {}
  getName() {
    return 'BBB';
  }
}

function init(obj: Ifunc) {
  const name = obj.getName();
  console.log(name);
}
var objA = new A();
var objB = new B();
init(objA);
init(objB);

export default {};
