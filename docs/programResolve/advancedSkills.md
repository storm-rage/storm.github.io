# 高级技能
- 使用前端工程化思维开发
- JavaScript对DOM操作的各种方式与性能开销
- 熟悉RESTful架构、跨域等技术
- 能对代码进行良好的性能优化
- 了解常用框架功能原理的代码实现
- 熟悉前端开发的一些安全问题
- 熟悉常见跨浏览器问题
- 了解必要的计算机网络协议
- 熟悉JavaScript的前后端开发
- 熟悉各种开发设计模式
- 了解前端的一些测试方法
## 1. 如何解决回调层级过深的问题？
回调层级过深，即回调地狱，用回调函数的方式来处理多个串行的异步操作，会造成嵌套很深的情况。
### 解决方案 
1. promise
- 用promise可以将串行的异步，处理成链式调用。
2. async/await
- async/await比用promise更优雅。
- async/await是Generator的语法糖。
-  async/await是Promise的语法糖。
- async/await是Generator和Promise的语法糖。
3. generator
- generator是ES6提供的一种异步编程解决方案。
- generator可以暂停函数的执行，返回任意表达式的值。
- generator可以通过next方法恢复函数的执行。
- generator可以通过throw方法抛出异常。
- generator可以通过return方法返回值。
- generator可以通过yield关键字暂停函数的执行，返回任意表达式的值。
- generator可以通过next方法恢复函数的执行。
4. 事件监听
5.  发布/订阅
9.  MutationObserver
10. 微任务
11. 宏任务
## 2. CORS跨域的原理？
跨域是指一个域下的文档或脚本试图去请求另一个域下的资源。
### 解决方案
1. JSONP
2. CORS
3. postMessage
4. WebSocket
5. Nodejs中间件代理
6. Nginx反向代理
7. document.domain + iframe
8. location.hash + iframe
9. window.name + iframe
10. window.postMessage
11. 跨子域的通信
12. 跨域资源共享（CORS）
13. 跨文档通信（Cross-document messaging）
14. 预检请求（Preflighted requests）
15. 服务器端设置Access-Control-Allow-Origin
16. 跨浏览器的CORS
17. 跨域资源共享（CORS）
## 3. 谈谈各种本地存储方案的优势与弊端？
1. cookie
2. localStorage
3. sessionStorage
## 4. JS延迟加载的方式有哪些？
### 1). defer
defer属性只适用于外部脚本文件。
### 2). async
async属性只适用于外部脚本文件。
### 3). 动态创建DOM方式
### 4). 使用setTimeout
### 5). 使用SSE
### 6). 使用Ajax
### 7). 使用动态脚本元素
### 8). 使用ES6的import()
### 9). 使用Promise
### 10). 使用async/await
### 11). 使用MutationObserver
### 12). 使用document.write()
### 13). 使用document.createElement()
1. async
2. defer
## 5. 哪些操作会造成内存泄漏？
什么是内存泄漏？
内存泄漏指任何对象在不再拥有或需要它之后却仍然存在。JavaScript中的内存泄漏大部分是由不合理的引用导致的。
### 1).意外声明全局变量是最常见也最容易修复的内存泄漏问题
```js
function fn() {
    name = 'lucy'
}
```
解释器在解释上面的函数时，会把name当做全局变量，即window.name = '张三'。只要window对象没有被清理，那么name属性和属性值将一直存在，造成内存泄露
解决方法：
1. 只要在变量声明前面加上var、let或const关键字即可，这样变量就会在函数执行完毕后离开作用域。
2. 使用this关键字
```js
function fn() {
    this.name = 'lucy'
}
```
3. 可以在 JavaScript 文件开头添加 “use strict”，使用严格模式。这样在严格模式下解析 JavaScript 可以防止意外的全局变量
4. 在使用完之后，对其赋值为null或者重新分配
### 2).定时器导致的泄漏
```js
let name = 'mick'
setInterval(()=>{
    console.log(name)
},100)
```
只要定时器一直运行，回调函数中引用的name就一直占用内存。
### 3).闭包、控制台日志、循环（两个对象彼此引用且彼此保留时，就会产生一个循环），如下
```js
let fun = function() {
    let name = 'jack'
    return function() {
        return name
    }
}
```
调用fun()会导致分配给name的内存被泄漏。以上代码执行后创建了一个内部闭包，只要返回的函数存在就不能清理name，因为闭包一致再引用着它。
## 6. 写一个通用的事件侦听器函数？
function addEvent(element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false)
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler)
    } else {
        element['on' + type] = handler
    }
}
function removeEvent(element, type, handler) {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false)
    } else if (element.detachEvent) {
        element.detachEvent('on' + type, handler)
    } else {
        element['on' + type] = null
    }
}

## 7. 介绍一下XSS和CSRF的原理和防范？
## 8. 如何实现一个简易的模块管理库？

## 9. 介绍for in的技术细节与性能问题？
可以用来遍历对象的可枚举属性（包括自身属性和继承的属性）。然而，使用 for...in 也存在一些技术细节和性能问题
1. 遍历顺序：for...in 循环的遍历顺序是不确定的，它取决于 JavaScript 引擎的实现。因此，在使用 for...in 进行遍历时，无法保证属性的遍历顺序是一致的。
2. 遍历原型链属性：for...in 循环会遍历对象的原型链上的可枚举属性。这意味着它不仅会遍历对象自身的属性，还会遍历继承的属性。如果只希望遍历对象自身的属性，而不包括继承的属性，可以通过使用 hasOwnProperty 方法进行判断。
3. 包括非数字属性：for...in 循环会遍历对象的所有可枚举字符串属性，包括数字形式的字符串属性。例如，对于数组对象，for...in 循环会遍历数组的原型链上的所有可枚举属性，包括数组的原型方法和索引值。这通常不是预期的遍历方式。
4. 性能问题：由于 for...in 循环需要遍历对象的所有属性，包括原型链上的属性，并且无法保证遍历顺序，因此在大型对象或嵌套对象上进行 for...in 循环可能会导致性能问题。每次迭代都需要对属性进行检查，并且需要额外的遍历操作。对于大型数据集合，可以考虑使用其他更高效的遍历方法，如 forEach、for...of 等

## 10. 谈谈JS的满加载和断点续调问题？
## 11. 如何实现JS的依赖注入？
## 12. 如何处理高并发请求？
## 13. nextTick实现原理？
vue采用异步更新策略，当监听到数据发生变化时不会立即去更新dom，而是开启一个任务队列，并缓存在同一事件循环中发生的所有数据变更；
这样的好处是可以蒋多次数据更新合并成一次，从而减少dom操作次数，如果不采用这种方法，数据改变100次就要去更新100次dom，消耗更多性能。
nextTick接受一个回调函数作为参数，并将回调函数延迟到dom更新后才执行。【使用场景】想要操作基于最新数据生成的dom时，可以放在nextTick的回调函数中。


