// function* dosomething() {
//     console.log("start");
//     yield;
//     console.log("finish");
// }
// var dosomething1 = dosomething();
// dosomething1.next();
// function* getStockPrice(stock) {
//     while(true){
//         yield Math.random()*100;
//     }
// }
// var priceGenerator = getStockPrice("IBM");
// var limitPrice = 15;
// var price = 100;
// while(price > limitPrice){
//     price = priceGenerator.next().value;
//     console.log(`the generator return ${price}`);
// }
// console.log(`buying at ${price}`);
