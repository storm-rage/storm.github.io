# ts项目相关
## import path from 'path'报错
原因分析：path模块是node.js内置的功能，但是node.js本身并不支持typescript，所以直接在typescript项目里使用是不行的
解决方案：安装@types/node
第一步
```js
npm install @types\node --save-dev
```
第二步
```js
pnpm i @types\node -D
```
安装pnpm
```js
//第一步
npm install -g pnpm
//第二步
//配置环境变量
//在系统变量添加环境变量 添加路径C:node.js\node_global
//第三步 刷新环境变量
//新开cmd，输入set PATH=C
//关闭这个cmd，再新开一个cmd，输入echo %PATH%
//输入pnpm -v，此时输出版本号即成功
```


问题2：提示模块 ""path"" 只能在使用 "allowSyntheticDefaultImports" 标志时进行默认导入

解决方案：

方式一：在tsconfig.node.json或者tsconfig.json添加"allowSyntheticDefaultImports": true

方式二： 使用解构
```js
import { resolve } form `path`
```

## type 和 interface的异同
- 用interface描述数据结构，用type描述数据类型
- 相同点
    - 都可以描述一个对象或者函数
    - 都允许扩展extends：interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface ，语法不同。
- 异同点
    - type 可以声明基本类型别名，联合类型，元组等类型
    - type语句中还可以使用typeof获取实例的类型进行赋值
    - interface能够声明合并

- interface 接口，TS 设计出来主要用于定义【对象类型】，可以对【对象】的形状进行描述
- type 型别名，为类型创建一个新名称。它并不是一个类型，只是一个别名。

类型别名可以起到类似接口的作用。主要区别在于type类型一旦定义就不能再添加别的属性，interface可以添加

使用的区别

interface
- 接口可以重复声明，ts会将他们合并
- 如果是type，重复声明会报错

【type】
- 可以定义基本类型别名，如type StringType = string
- 可以声明联合类型，如type paramType = number | string
- 可以声明元组类型，如type arrType = [string,string,number]

总结
1. 如果需要被extends或者implements,则尽量使用接口
2. 如果需要使用联合类型或者元组类型，类型别名更合适
3. 如果定义对象，则都可以
4. 如果实在不想选择，就优先使用interface实现，如果不能再用type
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


