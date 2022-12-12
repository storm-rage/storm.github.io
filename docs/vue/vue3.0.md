# vue3.0新特性
## 一、常用组合式api（重要）
### setup
- setup函数是 Composition API（组合API）的入口
- 在setup函数中定义的变量和方法最后都是需要 return 出去的 不然无法再模板中使用
```vue
<script>
 export default {
  name: 'App',
  setup(){
   let name = '流星'
   let age = 18
   //方法
   function say(){
    console.log(`我叫${name},今年${age}岁`)
   }

   //返回一个对象
   return {
    name,
    age,
    say
   }
  }
 }
</script>
```
- 这不是响应式的写法，然后你们可能会问，为什么没有用`this`，我们要想一想之前为什么要用`this`，还不是作用域的问题，然而这次我们都在`setup`里面，所以不会用到`this`，而且这里兼容vue2的写法如：`data，methods...`，并且在vue2中可以读取到vue3里的配置但是vue3里面不能读取到vue2的配置，所以，vue3和vue2不要混用，如果有重名那么优先`setup`。
- 如果大家不喜欢`return`这样的写法的话，可以用vue3新语法糖`<script setup>`，`<script setup>`就相当于在编译运行是把代码放到了 `setup` 函数中运行，然后把导出的变量定义到上下文中，并包含在返回的对象中。
- 它比`beforeCreate`和`created`这两个生命周期还要快，就是说，`setup`在`beforeCreate,created`前，它里面的this打印出来是`undefined`
- `setup`可以接受两个参数，第一个参数是`props`,也就是组件传值，第二个参数是`context`,上下文对象，`context`里面还有三个很重要的东西`attrs，slots,emit`，它们就相当于vue2里面的`this.$attrs,this.$slots,this.$emit`。

### ref与reactive
ref
- 怎么处理响应式数据呢，这里引入了`ref`，但是如果我们直接在代码里面修改是修改不了的,不如打印一下name和age，你会发现ref把它们变成了对象 并且还是`RefImpl`的实例对象
```vue
<template>
  <div class="home">
    <h1>姓名：{{name}}</h1>
    <h1>年龄：{{age}}</h1>
    <button @click="say">修改</button>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  name: 'Home',
  setup(){
    let name = ref('燕儿')
    let age = ref(18)
    console.log(name)
    console.log(age)
    //方法
    function say(){
      name='苒苒'
      age=20
    }
    return {
      name,
      age,
      say
    }
  }
}
</script>
```

- 在修改的时候要`.value`去修改，里面还是走的`get`与`set`去修改页面。
- 其实按道理的话，我们在页面上用的话应该要{{`name.value`}}显示的，但是因为vue3检测到你是ref对象，它就自动给你`.value`了
- 那么要是我定义的`ref`是个对象呢，因为我们知道尽管`ref`后会变成`RefImpl`的实例对象，所以我们就用`XX.value.xx`进行修改

```vue
<template>
  <div class="home">
    <h1>姓名：{{name}}</h1>
    <h1>年龄：{{age}}</h1>
    <h2>职业：{{job.occupation}}</h2>
    <h2>薪资：{{job.salary}}</h2>
    <button @click="say">修改</button>
  </div>
</template>

<script>
import {ref} from 'vue'
export default {
  name: 'Home',
  setup(){
    let name = ref('燕儿')
    let age = ref(18)
    let job=ref({
      occupation:'程序员',
      salary:'10k'
    })
    console.log(name)
    console.log(age)
    //方法
    function say(){
      job.value.salary='12k'
    }
    return {
      name,
      age,
      job,
      say
    }
  }
}
</script>
```
- 但是我们打印job.value,你会发现，它不再是`RefImpl`实例对象，变成了`Proxy`实例对象，他只是vue3底层，把对象都变成了`Proxy`实例对象，对于基本数据类型就是按照`Object.defineProperty`里面的`get`和`set`进行数据劫持然后进行响应式，但是如果是对象类型的话，是用到的`Proxy`，但是vue3把它封装在新函数`reactive`里，就相当于，ref中是对象，自动会调用`reactive`。

reactive
- 只能定义对象类型的响应式数据，前面说到的ref里是对象的话，会自动调用`reactive`，把`Object`转换为`Proxy`，那我们来打印一下，你会发现就直接变成了`Proxy`，之前为什么会`.value`呢，是因为要去获取值，然后通过`reactive`变成`Proxy`，但是现在是直接通过`reactive`变成`Proxy`，而且它是进行的一个深层次的响应式，也可以进行数组的响应式。
```vue
<template>
  <div class="home">
    <h1>姓名：{{name}}</h1>
    <h1>年龄：{{age}}</h1>
    <h2>职业：{{job.occupation}}<br>薪资：{{job.salary}}</h2>
    <h3>爱好：{{hobby[0]}},{{hobby[1]}},{{ hobby[2] }}</h3>
    <button @click="say">修改</button>
  </div>
</template>

<script>
import {ref,reactive} from 'vue'
export default {
  name: 'Home',
  setup(){
    let name = ref('燕儿')
    let age = ref(18)
    let job=reactive({
      occupation:'程序员',
      salary:'10k'
    })
    let hobby=reactive(['刷剧','吃鸡','睡觉'])
    console.log(name)
    console.log(age)
    //方法
    function say(){
      job.salary='12k'
      hobby[0]='学习'
    }
    return {
      name,
      age,
      job,
      say,
      hobby
    }
  }
}
</script>
```
- 有些人可能觉得，哎呀，我记不住，我就用ref，每次就.value可以了，香香香。他喵的，你正常点，要是一个页面就几个数据的话那还好，要是一堆数据，不得把你.value点的冒烟吗？，其实你可以按照之前vue2中data的形式来写，这样你就会觉得reactive香的一批了
```vue
<template>
  <div class="home">
    <h1>姓名：{{data.name}}</h1>
    <h1>年龄：{{data.age}}</h1>
    <h2>职业：{{data.job.occupation}}<br>薪资：{{data.job.salary}}</h2>
    <h3>爱好：{{data.hobby[0]}},{{data.hobby[1]}},{{ data.hobby[2] }}</h3>
    <button @click="say">修改</button>
  </div>
</template>

<script>
import {reactive} from 'vue'
export default {
  name: 'Home',
  setup(){
    let data=reactive({
      name:'燕儿',
      age:18,
      job:{
        occupation:'程序员',
        salary:'10k'
      },
      hobby:['刷剧','吃鸡','睡觉']
    })
    //方法
    function say(){
      data.job.salary='12k'
      data.hobby[0]='学习'
    }
    return {
      data,
      say,
    }
  }
}
</script>
```
怎么样，是不是直接暴露出去个data就好了，这样起码更能理解，不会让人摸不着头脑为什么要.value，是吧
#### ref与reactive的区别
- ref用来定义：基本类型数据。
- ref通过Object.defineProperty()的get与set来实现响应式（数据劫持）。
- ref定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要.value。
- reactive用来定义：对象或数组类型数据。
- reactive通过使用Proxy来实现响应式（数据劫持）, 并通过Reflect操作源代码内部的数据。
- reactive定义的数据：操作数据与读取数据：均不需要.value。
当然，我之前就说过，ref可以定义对象或数组的，它只是内部自动调用了reactive来转换。


### vue3的响应式原理
### computed,watch与watchEffect
### 生命周期
### hooks函数
### toRef与toRefs
## 二、其他组合式api（了解）
### shallowReactive与shallowRef
### readonly与shallowReadonly
### toRaw与markRaw
### customRef
### provide与inject
### 影响力
## 三、有趣的组件
### Fragment
### Teleport
### Suspense
## 四、vue3其他改动
### router
### 全局api的转移
### 其他的转变



