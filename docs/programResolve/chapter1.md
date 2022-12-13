# 高级前端必备
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
## 二、 数组方法总结
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

```



