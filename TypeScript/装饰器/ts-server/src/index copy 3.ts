class Log {
  @decorate
  print(msg) {
    console.log(msg);
  }
}

function decorate(target, property, decriptor) {
  console.log(target);
  console.log(property);
  console.log(decriptor);
  const oldValue = decriptor.value;
  decriptor.value = msg => {
    msg = `[${msg}]`;
    return oldValue.apply(null, [msg]);
  }
  return decriptor;
}

const log = new Log();
log.print("Hello");
