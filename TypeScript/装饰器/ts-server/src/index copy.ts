// class Log {
//   print(msg) {
//     console.log(msg);
//   }
// }

// const dec = name => (target, property) => {
//   const old = target.prototype.print;
//   target.prototype[property] = msg => {
//     msg = `{${msg}}`;
//     old(msg);
//   }
// }

// dec("柯里化")(Log, "print");

// const log = new Log();
// log.print("Hello Ts");
