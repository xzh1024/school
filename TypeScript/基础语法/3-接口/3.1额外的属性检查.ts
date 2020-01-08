interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
    return
}

// as 类型断言
let mySquare = createSquare({ colour: "red", width: 100 });