// 接口：interface

// ? 可选参数
interface SquareConfig {
    color?: string;
    width?: number;
}
function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
      newSquare.color = config.color;
    }
    if (config.width) {
      newSquare.area = config.width * config.width;
    }
    return newSquare;
}
  
let mySquare = createSquare({color: "black"});


// readonly 只读属性
interface Point {
    readonly x: number;
    readonly y: number;
}

let point1: Point = { x: 10, y: 20 };

// ReadonlyArray<T>类型
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
// ro[0] = 12; // error!
// ro.push(5); // error!
// ro.length = 100; // error!
// a = ro; // error!
// 上面代码的最后一行，可以看到就算把整个ReadonlyArray赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：
a = ro as number[]; //as是ts的关键字,只是用来限制child的类型

let list: Array<any> = [1, 2, 3];