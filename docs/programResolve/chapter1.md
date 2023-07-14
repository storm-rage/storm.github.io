# 方法总结
## 一、 对象方法总结
### 对象属性删除
```js
const obj = {
    name: '小明',
    age: 22,
}
//第一种delete
delete obj.name//true
console.log(obj)//{age:22}
//第二种 es6方法 Reflect.deleteProperty()
Reflect.deleteProperty(obj,'name')//true
console.log(obj)//{age:22}
```
### 查找对象属性
查找对象中是否含有某一个属性
```js
const obj = {
    name: '小明',
    age: 22,
}
//第一种hasOwnProperty()
obj.hasOwnProperty('name')//true
//第二种 !==
obj.name !== undefined //true
//第三种 Object.keys()
Object.keys(obj).indexOf('name')//0
Object.keys(obj).indexOf('age')//1
```
## 二、 高阶函数
### reduce方法
- reduce()方法接收一个函数做为累加器，数组中的值从左到右缩减，最终计算为一个值。reduce对于空数组是不会执行回调函数的。
  - 语法 arr.reduce((total,currentValue,currentIndex,arr)=>{ }, initialValue)
  - total 必需。 初始值或者计算结束后的返回值
  - currentValue 必需。 当前值
  - currentIndex 可选。 当前值的索引
  - arr 可选。 当前元素所属的数组对象
  - initialValue 可选。 传递给函数的初始值
  
1. 数据结构转换:数组转对象
```js

//目标：把obj转换为目标类型 {mike: {age: '18', interest_1: 'ball', interest_2: 'music'}}
let obj = [
    {
        name: 'mike',
        age: '18',
        interest: [
            {id: 1, value: 'ball'},
            {id: 2, value: 'music'},
        ],
    }
]
//第一步
let val1 = obj.reduce((a,b)=>{
    const {name, ...rest} = b
    a[name] = rest
    return a
},{})
//{mike: {age: '18', interest: [{id:1, value: 'ball'},{id:2, value: 'music'}]}}

//第二步
let val2 = val1.mike.interest.reduce((a,b)=>{
    const {id, value} = b
    a['interest_'+ id] = value
    return a
},{})
//{interest_1: 'ball', interest_2: 'music'}

//第三步
//先删除不需要的interest属性
Reflect.deleteProperty(val1.mike,'interest')//true
//添加到目标对象里
let result = {
    ...val1.mike,
    ...val2
}
console.log(result)//{age: '18', interest_1: 'ball', interest_2: 'music'}
//OK!
```
2. 数组各项之和累加和累乘
```js
let arr = [1,6,8,9,3,6]
//累加
let arr1 = arr.reduce((a,b)=>{
    return a+b
})
console.log(arr1)//33
//累乘
let arr2 = arr.reduce((a,b)=>{
    return a*b
})
console.log(arr2)//
```
3. 求数组各项之间的最大值
```js
let arr = [1,6,8,9,3,6]
//方法一
let arr2  = arr.reduce((a,b)=>{
    return Math.max(a,b)
})
console.log(arr2)//9
//方法二：更快的方法
Math.max(...arr)//9

```
4. 数组去重
```js
let arr = [1,6,8,9,3,6]
let arr2= arr.reduce((a,b)=>{
    a.indexOf(b) === -1 && a.push(b)
  return a
}, [])//此处的[]作为a的初始值
console.log(arr2)//[1,6,8,9,3]
//其它方法
//filter
let arr3 = arr.filter((currentValue, index, arr)=>
    arr.indexOf(currentValue) === index
)
console.log(arr3)//[1,6,8,9,3]
//for...of
let tarArr = []
let arr4 = function() {
  for(let i of arr){
    //if(tarArr.indexOf(i) === -1){
    // if(!tarArr.includes(i)){
    if(!tarArr.some(i=> {
      return tarArr.includes(i)
    })){
      tarArr.push(i)
    }
  }
  return tarArr
}
console.log(arr4)//[1,6,8,9,3]
//set数据类型
let arr4 = [...new Set(arr)]//[1,6,8,9,3]
```
## 三、防抖和节流
### 基本概念
- 函数防抖（debounce）：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。
- 函数节流（throttle）：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
### 应用场景
- 节流（控制次数）：resize、scroll
- 防抖：input（模糊匹配）
### 手写防抖和节流
```js
//防抖
function debounce(func, time) {
    let timer = null
    return () => {
        clearTimeout(timer)
        timer = setTimeout(()=> {
            func.apply(this, arguments) //保证内部this指向input对象
        }, time)
    }
}

//尾节流，时间戳写法首次立即执行
function throttle(func, time) {
    let activeTime = 0
    return () => {
        const current = Date.now()
        if(current - activeTime > time) {
            func.apply(this, arguments)
            activeTime = Date.now()
        }
    }
}
```
## 四、tree数据转换
### tree数据转换为一维数组
## 五、webpack配置与应用
## 六、this指向
### 箭头函数
先看结论：
- 普通函数this指向看调用；箭头函数的this指向看声明，指向声明时候的父级作用域
- setTimeout会延迟函数的声明
```js
let app1 = {
    a : 1,
    fn : () => {
        console.log(this)
        console.log(this.a)
  }
}
app1.fn()//输出undefined 箭头函数this指向windows
//根据第一条可知，声明时就已经确定this的指向为父级作用域，也就是window，所以输出undefined
let app2 = {
    a : 1,
    fn : function () {
      console.log(this.a)
    }
}
app2.fn()//输出1 箭头函数this指向app2
//根据第一条可知，调用的时候this指向app2
let app3 = {
    a : 1,
    fn : function() {
        setTimeout(() => {
            console.log(this)//指向app3
            console.log(this.a)//1
        },500)
    }
}
app3.fn()
//根据第一条可知，setTimeout中函数的父级是app3，所以是指向app3
function Person() {
    this.age = 0
    setTimeout(() => {
        age = 10
      //回调里面的this变量指向期望的对象
        console.log(this.age)
    },3000)
}
let p = new Person()//输出0  setTimeout中的this指向全局变量

let app4 = {
    a: 1,
  fn: function() {
        setTimeout(function (){
            console.log(this)//指向window
            console.log(this.a)//undefined
        },500)
  }
}
app4.fn()
//因为普通函数中，setTimeout的this指向全局变量
//因为setTimeout中重新声明了一个函数（而且是全局的），所以这个函数再调用的时候并不是作为app4的方法调用，而是作为一个函数调用，所以是window

//-------------------setTimeout的this--------------------------
//默认情况下代码
function Person_1() {
    this.age = 0
  setTimeout(function() {
      console.log(this.age)// setTimeout的this指向全局变量，所以是undefined
  },1000)
}
let p_1 = new Person_1()//3秒后返回window对象
//--------------------对象的this指向问题------------------------------
let obj = {
    prop : 33,
    f: function () {
        return this.prop
    }
}
console.log(obj.f())//被对象obj调用，所以this指向obj，prop为33
let obj_ex = obj.f
console.log(obj_ex())//全局环境内没有prop，所以undefined
```
### 箭头函数


