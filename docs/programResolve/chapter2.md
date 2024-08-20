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

## 数据类型判断方式
- typeOf 可以判断基本类型数据，缺点判断数组，对象，函数，null会返回object
- instanceof 判断是否是某个类型的实例，官方解释：instanceOf用来检测构造函数的`prototype`是否出现在某个实例对象的原型链上，语法 object instanceof constructor
- constructor.name 基本数据类型不具备该属性，尝试访问会导致`TypeError`;对象数组函数，内置对象Date,RegExp,Error等都有该属性，可以使用这个来判断
- Object.prototype.toString.call() 返回格式为[object xxx]，xxx为数据格式


## setTimeout、Promise、Async/Await 的区别
setTimeout, Promise, 和 async/await 是JavaScript中处理异步操作的三种不同机制。它们各自有独特的用途和工作原理
- setTimeout回调函数中的为宏任务，放在任务队列中，当主线程执行完所有同步任务，才会执行回调函数
- promise是微任务，当主线程执行完所有同步任务，才会执行微任务，微任务执行完，才会执行宏任务
- async/await是语法糖，async函数返回一个promise对象，await是等待promise对象，当promise对象resolved, await后边的代码才会执行
- 主要区别
  - setTimeout和promise都是异步执行，
  - async/await是同步执行，async/await是语法糖，可以理解为promise的语法糖
  - setTimeout和promise都是异步执行，但是promise可以链式调用，setTimeout不可以链式调用
- 执行顺序
  1. setTimeout是宏任务，promise是微任务，`async/await`是同步执行
  2. `async/await` 本质上是基于 Promise 实现的异步操作方式。当遇到 `await` 关键字时，函数会暂停执行，等待 `await` 后面的 Promise 对象的状态变为 `fulfilled` 或 `rejected`，然后继续执行后续代码。
     `setTimeout` 是一个宏任务，它会在指定的延迟时间后将回调函数放入宏任务队列等待执行。
- js的执行逻辑
  - js是单线程的，一次只能执行一个任务，当执行完一个宏任务后，会检查所有微任务，如果有微任务，则执行微任务，如果没有微任务，则执行下一个宏任务。
  - 具体来说，微任务的执行优先级高于宏任务。也就是说，在一个宏任务执行完后，会立即清空微任务队列，将其中的所有微任务依次执行完毕，然后再去执行下一个宏任务

  ![An image](/storm.github.io/loop.png)
**总结：** js代码在执行的时候，会先执行同步代码，遇到异步宏任务则将异步宏任务放入宏任务队列中，遇到异步微任务则将异步微任务放入微任务队列中，当所有同步代码执行完毕后，再将异步微任务从队列中调入主线程执行，
  微任务执行完毕后，再将异步宏任务从队列中调入主线程执行，一直循环至所有的任务执行完毕（完成一次事件循环EventLoop）。
**注意：** 每个异步宏任务执行完之后，都会检查是否存在待执行的微任务；如果有，则执行完所有的微任务之后，再继续执行下一个宏任务。
## （微医）Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？
Promise 构造函数是同步执行，then 方法是异步执行。
```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve(5);
  console.log(2);
}).then(val => {//promise实例后的第一个then
  console.log(val);//resolve()传入的值5；
});

promise.then(() => {//promise实例后的第二个then
  console.log(3);
});

console.log(4);

setTimeout(function() {
  console.log(6);
});
//执行顺序为124536
```
在 `Promise` 中，`resolve` 和 `reject` 本身的调用是同步的，但它们触发的后续 `then` 或 `catch` 中的回调函数的执行是异步的。
```js
const myPromise = new Promise((resolve, reject) => {
  console.log('同步执行这部分');
  resolve('成功的值');
  console.log('这部分也是同步执行的');
});

myPromise.then(value => {
  console.log('异步执行这里，值为:', value);
});
// 输出顺序为：同步执行这部分，这部分也是同步执行的，异步执行这里，值为: 成功的值
```
## 以下判断数组的方法，请分别介绍它们之间的区别和优劣：Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()
- `Object.prototype.toString.call()`
  - `Object.prototype.toString.call()` 是一个全局方法，用于返回对象的字符串形式，返回的字符串形式为 `[object 类型]`，其中 `类型` 是对象的类型。 
- `instanceof`
  - `instanceof` 是一个运算符，用于判断一个对象是否是某个类的实例。 
- `Array.isArray()`
  - `Array.isArray()` 是一个全局方法，用于判断一个对象是否是数组。 
## promise的相关api
- 静态方法
  - Promise.all()
  
    `Promise.all()` 方法是 promise 并发方法之一。它可用于聚合多个 Promise 的结果。通常在有多个相关的异步任务并且整个代码依赖于这些任务成功完成时使用，我们希望在代码执行继续之前完成所有任务。
    `Promise.all()` 方法会在任何一个输入的 Promise 被拒绝时立即拒绝。
  相比之下，`Promise.allSettled()` 方法返回的 Promise 会等待所有输入的 Promise 完成，不管其中是否有 Promise 被拒绝。如果你需要获取输入可迭代对象中每个 Promise 的最终结果，则应使用 allSettled() 方法
  - Promise.allSettled()
  
      `Promise.allSettled()` 方法是 promise 并发方法之一。在你有多个不依赖于彼此成功完成的异步任务时，或者你总是想知道每个 promise 的结果时，使用 `Promise.allSettled()`。
    相比之下，如果任务相互依赖，或者如果你想在任何 promise 被拒绝时立即拒绝，`Promise.all()` 返回的 Promise 可能更合适。
  - Promise.any()
  
    `Promise.any()` 会以第一个兑现的 Promise 来兑现，即使有 Promise 先被拒绝
    `Promise.any()` 方法是 Promise 并发方法之一。该方法对于返回第一个兑现的 Promise 非常有用。一旦有一个 Promise 兑现，它就会立即返回，因此不会等待其他 Promise 完成
  - Promise.race()
  
  在多个promise并发时，`promise.race()`用于判断哪个先完成，即只需要等待其中一个完成即可。
  - Promise.resolve()
  - Promise.reject()
- 实例方法
  - Promise.prototype.then()
  - Promise.prototype.catch()
  - Promise.prototype.finally()