# VUE2.0进阶
## 一、vue实例与vue组件

1、组件是扩展的 Vue 构造器，“扩展”的含义是用一些“默认”属性、方法以及钩子函数来“定制” Vue 构造器，其语法自然就和 Vue 实例化的语法类似。

2、模板中的<MyComponent...>是实例化组件的一种方法（另一种方法是 render 函数中使用 createElement 创建），实例化的组件就是一个 Vue 实例。

```vue
//main.js根实例
import Vue from 'vue'
import App from './App'
import router from './router'

new Vue({//这里就是一个vue实例
    el: '#app',//el挂载点，根实例特有
    router,   //路由，根实例特有
    components: { App },
    template: '<App/>',//此处引根组件
})

//app.vue单文件组件
<template>
<div id="app">
    <div class="welcome">welcome! {{name}}, you are {{age}} years old</div>
</div>
</template>
<script>
    export default {  //输出为对象
    name: 'App',  //组件名字
    data:function(){ //data为函数
    return {
    name:'wangyue',
    age:'25'
}
},
}
</script>
<style>
    .welcome{
    font-size: 32px;
    color: blueviolet;
}
</style>
```

::: danger DANGER 
this is dangerous
:::

::: tip TIP 
this is tip
:::

::: warning WARNING 
this is warning
:::
## 二、组件间通信
### 1、props和$emit
父子通讯

- props：父组件单向数据流向子组件

- $emit：子组件通过事件流向父组件
```vue
<!-- 父组件 -->
<template>
  <div>
    <compB :title="value" @more="onMore"/>
  </div>
</template>
<script>
  import compB from '/compB'
  export default{
    name: 'compA',
    data(){
      return {
        value: ""
      }
    },
    methods:{
      onMore(value){
        console.log('value', value)
      }
    }
  }
</script>

<!-- 子组件 -->
<template>
	 <div>
     <div>{{title}}</div>
     <button @click="handleMore">查看更多</button>
  </div>
</template>
<script>
  export default{
    name:'compB',
    props:{
      title:{
        type: String,
        default: 'Jian'
      }
    },
    methods:{
      handleMore(){
        this.$emit('more', 'message to father')
      }
    }
  }
</script>
```

