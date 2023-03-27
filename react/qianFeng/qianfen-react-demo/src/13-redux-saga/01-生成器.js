function* test() {
  console.log('111111');
  var input1 = yield '111-输出';
  console.log('222222-', input1);
  var input2 = yield '222-输出';
  console.log('333333-', input2);
  var input3 = yield '333-输出';
  console.log(input3);
}

var t = test();
var res1 = t.next();
var res1 = t.next('aaa');
var res2 = t.next('bbb');
var res2 = t.next('ccc');

function* test1() {
  setTimeout(() => {
    console.log(111);
    t1.next();
  }, 1000);
  yield;
  setTimeout(() => {
    console.log(222);
    t1.next();
  }, 1000);
  yield;
  setTimeout(() => {
    console.log(333);
  }, 1000);
  yield;
}

var t1 = test1();
t1.next();
