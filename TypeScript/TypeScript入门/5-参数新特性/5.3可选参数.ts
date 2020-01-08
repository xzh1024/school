function test3(a: string, b?:string, c: string = "jojo") {
    // 可选参数须在必选参数的后面
    console.log(a); //xxx
    console.log(b); //undefined
    console.log(b); //jojo
}

test3("xxx");