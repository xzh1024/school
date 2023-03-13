/**
 * 1.Partial<Type>
 *  构造一个类型，其中 Type 的所有属性都设置为可选。
 * 
 * Make all properties in T optional. 
 * typescript/lib/lib.es5.d.ts
 * 
type Partial<T> = {
  [P in keyof T]?: T[P];
};
 */

// type User = {
//   name: string;
//   password: string;
//   address: string;
//   phone: string;
// };

// type PartialUser = Partial<User>
// const user1:PartialUser = {
//   name: '小明'
// };
// const user2:User = {
//   name: '小明'
// };


/**
 * 2.Required<Type>
 * 构造一个类型，该类型由设置为 required  Type 的所有属性组成，部分的反义词。
 * 
 * Make all properties in T required.
 * typescript/lib/lib.es5.d.ts
 * 
type Required<T> = {
  [P in keyof T]-?: T[P];
};
 */

// type User = {
//   name?: string;
//   password?: string;
//   address?: string;
//   phone?: string;
// };

// type RequiredUser = Required<User>;
// const user1: RequiredUser = {
//   name: '小明',
//   password: '',
//   address: '火星',
//   phone: '119',
// }
// const user2: User = {
//   name: '小明',
// };


/**
 * 3.Required<Type>
 *  构造一个 Type 的所有属性都设置为 readonly 的类型，这意味着构造类型的属性不能被重新分配。
 * 
 * Make all properties in T readonly.
 * typescript/lib/lib.es5.d.ts
 * 
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
 */

// type User = {
//   name: string;
//   password: string;
//   address: string;
//   phone: string;
// };

// type ReadonlyUser = Readonly<User>

// const user1: ReadonlyUser = {
//   name: '小明',
//   password: '',
//   address: '火星',
//   phone: '119',
// };
// user1.name = '张三'; // 无法为“name”赋值，因为它是只读属性。



/**
 * 4.Record<Keys, Type>
 *  构造一个对象类型，其属性键为 Keys，其属性值为 Type，此实用程序可用于将一种类型的属性映射到另一种类型。
 * 
 * Construct a type with a set of properties K of type T.
 * typescript/lib/lib.es5.d.ts
 * 
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
 */

// type UserIds = 1000 | 1001 | 1002; // 联合类型
// type User = {
//   name: string;
//   password: string;
//   address: string;
//   phone: string;
// };
// type UserMap = Record<UserIds, User>;
// const user1: UserMap = {
//   1000: {
//     name: '张三',
//     password: '',
//     address: '火星',
//     phone: '119'
//   },
//   1001: {
//     name: '李四',
//     password: '',
//     address: '火星',
//     phone: '119'
//   },
//   1002: {
//     name: '王五',
//     password: '',
//     address: '火星',
//     phone: '119'
//   }
// }



/**
 * 5. Exclude<UnionType, ExcludedMembers>
 *  通过从 UnionType 中排除可分配给 ExcludedMembers 的所有联合成员来构造类型。
 * 
 * Exclude from T those types that are assignable to U.
 * typescript/lib/lib.es5.d.ts
 * 
type Exclude<T, U> = T extends U ? never : T;
 */

// type T0 = Exclude<"a" | "b" | "c", "a">;
// // type T0 = "b" | "c"
// type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
// // type T1 = "c"
// type T2 = Exclude<string | number | (() => void), Function>;
// // type T2 = string | number



/**
 * 6. Extract<Type, Union>
 *  通过从 Type 中提取所有可分配给 Union 的联合成员来构造一个类型。
 * 
 * Extract from T those types that are assignable to U.
 * typescript/lib/lib.es5.d.ts
 * 
type Extract<T, U> = T extends U ? T : never;
 */

// type T0 = Extract<"a" | "b" | "c", "a" | "f">;
// // type T0 = "a"
// type T1 = Extract<string | number | (() => void), Function>;
// // type T1 = () => void
// const data1: T0 = "a";
// const data2: T1 = () => {
//   console.log("Extract");
// }


/**
 * 7. Pick<Type, Keys>
 *  通过从 Type 中选择一组属性 Keys（字符串文字或字符串文字的联合）来构造一个类型。
 * 
 * From T, pick a set of properties whose keys are in the union K.
 * typescript/lib/lib.es5.d.ts
 * 
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
 */

// type User = {
//   name: string;
//   password: string;
//   address: string;
//   phone: string;
// };
// type PartialUser = Pick<User, "name" | "address">
// const user1: PartialUser = {
//   name: '小明',
//   address: '火星'
// }



/**
 * 8.Omit<Type, Keys>
 *  通过从 Type 中选择所有属性然后删除 Keys（字符串文字或字符串文字的联合）来构造一个类型。
 * 
 * Construct a type with the properties of T except for those 
 * in type K. 
 * typescript/lib/lib.es5.d.ts
 * 
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
 */

type User = {
  name: string;
  password: string;
  address: string;
  phone: string;
};
type PartialUser = Omit<User, "password" | "phone">
const user1: PartialUser = {
  name: '小明',
  address: '火星'
}



/**
 * 10. Parameters<Type>
 *  从函数类型 Type 的参数中使用的类型构造元组类型。
 * 
 * Obtain the parameters of a function type in a tuple.
 * typescript/lib/lib.es5.d.ts
 * 
type Parameters<T extends (...args: any) => any> = T extends 
  (...args: infer P) => any ? P : never;
 */

// function getUserInfo(id: number, name: string) {
//   return `User ID: ${id}, User Name: ${name}`;
// }
// type FuncParams = Parameters<typeof getUserInfo> // [id: number, name: string]
// type FirstParameter = Parameters<typeof getUserInfo>[0] // number

// const user01: FuncParams = [1001, '张三'];
// const user02: FirstParameter = 1002;


/**
 * 11. ReturnType<Type>
 *  构造一个由函数 Type 的返回类型组成的类型。
 * 
 * Obtain the return type of a function type.
 * typescript/lib/lib.es5.d.ts
 * 
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
 */

function getUserInfo(id: number, name: string) {
  return `User ID: ${id}, User Name: ${name}`;
}

type FuncReturnType = ReturnType<typeof getUserInfo>; // string
type T0 = ReturnType<(s: string) => void>; // type T0 = void
type T1 = ReturnType<any> // any
type T2 = ReturnType<never> // never

/**
 * 12. Uppercase<StringType>
 *  将字符串文字类型转换为大写。
 * 
 */

// type Method = "get" | "post" | "put" | "delete";
// type UppercaseMethod = Uppercase<Method>;
// const method01: UppercaseMethod = "POST";


/**
 * 13.小写<StringType>
 *  将字符串文字类型转换为小写。
 * 
 */

type Method = "GET" | "POST" | "PUT" | "DELETE";
type LowercaseMethod = Lowercase<Method>;
const method01: LowercaseMethod = "get";
