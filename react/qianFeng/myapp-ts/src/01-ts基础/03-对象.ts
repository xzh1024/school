interface IObj {
  name: string;
  age: number;
  location?: string; // 可选属性
  [propName: string]: any;
}
interface IObj {
  sex: boolean;
}
var obj1: IObj = {
  name: '小明',
  age: 100,
  sex: true,
};
export default {};
