# 面试题
## string('123')和new String('123')
一道面试题
```js
var str = 'hello world'
var str1 = String('hello world')
var str2 = new String('hello world')
console.log(str1 === str)
console.log(str2 === str)
//输出结果为？
```
- var str = 'hello world'　　定义了一个 str 变量，同时给变量 str 赋值 'hello world' 字符串，此时 str 的值为字符串 'hello world'，类型为基本类型。
- var str1 = String('hello world')　　这是字符串声明的形式创建了字符串，此时 str1 的值也为字符串 'hello world'，类型为基本类型。
- var str2 = new String('hello world')　　此时的String为一个构造函数，而 new 操作符创建了一个字符串对象，此时的 str2 为字符串对象，类型为引用类型。

综上分析可知

  console.log(str1 === str)　　//　ture（str和str1同为字符串，且值相同）
  console.log(str2 === str)　　//　false（str2为字符串对象，对象和基本类型值不相等）
  
# typeScript面试题
## type 和 interface的异同
- 用interface描述数据结构，用type描述数据类型
- 相同点
  - 都可以描述一个对象或者函数
  - 都允许扩展extends：interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface ，语法不同。
- 异同点
  - type 可以声明基本类型别名，联合类型，元组等类型
  - type语句中还可以使用typeof获取实例的类型进行赋值
  - interface能够声明合并
```js
//1、都可以描述一个对象或者函数
interface User {
 name: string
 age: number
}
interface SetUser {
 (name: string, age: number): void; 
}
type User = {
 name: string
 age: number
};
type SetUser = (name: string, age: number)=> void;

//2、都允许扩展
//interface extends interface
interface Name {
 	name: string; 
}
interface User extends Name {
 	age: number; 
}
// type extends type
type Name = {
 	name: string; 
}
type User = Name & { age: number };

// 3、异同点：type可以声明基本类型别名，联合类型，元组等类型
// 基本类型别名
type Name = string;

// 联合类型
interface Dog {
    wong()
}
interface Cat {
    miao();
}

type Pet = Dog | Cat;

// 具体定义数组每个位置的类型
type PetList = [Dog, Pet];

// 当你想要获取一个变量的类型时，使用typeof
let div = document.createElement('div');
type B = typeof div;
```