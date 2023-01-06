# 面试要点
## 1.render函数,使用场景
## 2.typescript相关
## 3.px,rem,em的异同点
## 4.封装过的最有难度的组件介绍一二
table组件
## 5.nextTick原理


## 6.深浅拷贝
深拷贝方法
### JSON.stringify() JSON.parse()
要求数据必须符合json格式，如果数据中存在function和symbol会转换失败
### 递归
实现原理
1. 使用递归的方式实现数组、对象的深拷贝。
2. 先判断各个字段类型，然后用递归解决嵌套数据。
3. 判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，是对象的话进行对象拷贝。
4. 进行深拷贝的不能为空，并且是对象或者数组
```js
function deepClone(obj){
　　let objClone =  Array.isArray(obj) ? [] : {};
　　if (obj && typeof obj === 'object') {
　　　　for(let key in obj){
　　　　　　if (obj[key] && typeof obj[key] === 'object'){ //判断对象的这条属性是否为对象
　　　　　　　　objClone[key] = deepClone(obj[key]); //若是对象进行嵌套调用
　　　　　　}else{
　　　　　　　　objClone[key] = obj[key]
　　　　　　}
　　　　}
　　}
　　return objClone; //返回深度克隆后的对象
}
```
### 插件lodash中的方法
```js
import lodash from 'lodash'
var objects = [1,{'a':1},{'b':2}]
var deep = lodash.cloneDeep(objects)
deep[0]=2
deep[1].a=2
console.log(objects[0])//1
console.log(deep[0])//2
console.log(objects[1].a)//1
console.log(objects[1].a)//2
```
## 7.响应式原理
defineProperty原理
## 8.diff算法
## 9.render方法
## 10.微前端
- 微前端不是一种技术，是一种架构策略。总体来说，是摒弃大型单体方式，将前端分割成小而简单的单独的块，这些块可以单独开发测试和部署，同时仍然可以整合为一个整体应用。可以理解为微前端是一种将多个可以单独交付的应用聚合为一个整体的架构风格。
- 微前端没有技术栈的约束。如果多团队统一使用react技术栈，那么对微前端方案的跨技术栈使用没有要求。如果团队同时使用了react和vue，那么对微前端的跨技术栈要求比较高

  微前端的优势
- 同步更新。如果多个应用同时依赖某个功能模块，只需要更新服务应用，其他业务应用即可同步更新。
- 增量升级。大型应用中难免存在老旧程序，整体重构翻新成本太高。微前端可以使我们独立的对产品模块做独立决策，让团队能持续增加新应用而不必修改原有的产品部分。
- 独立部署。
## 11.eventLoop事件流