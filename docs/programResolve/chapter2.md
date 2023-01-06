# 面试题
## string('123')和new String('123')有何不同
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