# VUE2.0进阶
## 一、vue实例与vue组件
1. 组件是扩展的 Vue 构造器，“扩展”的含义是用一些“默认”属性、方法以及钩子函数来“定制” Vue 构造器，其语法自然就和 Vue 实例化的语法类似。
2. 模板中的<MyComponent...>是实例化组件的一种方法（另一种方法是 render 函数中使用 createElement 创建），实例化的组件就是一个 Vue 实例。
```js
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
### 2、$parent/$children
父子通讯
- $parent：可以用来从一个子组件访问父组件的实例，提供了一种随时访问父级组件的机会，可以替代将数据以props的方式传入子组件的方式

- $children：可以遍历当前组件的全部子组件，$children并不保证顺序，也不是响应式的。vue3中移除了实例的$children属性，推荐使用$refs来访问子组件的实例
```vue
<!-- 父组件 -->
<template>
  <child-comp></child-comp>
</template>
<script>
  import childComp from './child'
  export default {
    name: 'parentComp',
    data(){
      return {
        parentMsg: 'father component'
      }
    },
    components: {
      childComp
    },
    mounted(){
      //取子组件的属性值
      console.log(this.$children[0].childMsg)
    }
  }
</script>

<!-- 子组件 -->
<template>
	<span>{{magTxt}}</span>
</template>
<script>
  export default {
    name: 'childComp',
    data(){
      return {
        msgTxt: ''
        childMsg: 'child component'
      }
    },
    mounted(){
      //取父组件的data属性值
      this.msgTxt = this.$parent.parentMsg
    }
  }
</script>
```
### 3、$root/$refs
父子通讯
- $root：每个new Vue实例的子组件中都有$root属性，可以通过$root属性访问根实例，若当前组件没有父组件实例，则$root为自己。
- $refs：可以通过ref为子组件赋予一个id引用，从而实现在js里直接访问一个子组件。$refs返回一个对象，包括注册过ref的所有dom元素和组件实例，用于父组件访问子组件。
```js
 new Vue({
	data:{
		foo: 1
	},
  computed: {
		bar: function(){/* */}
  },
  methods: {
		baz: function(){/* */}
  }
})

//$root使用实例
console.log(this.$root.foo)
console.log(this.$root.bar)
console.log(this.$root.baz())
this.$root.foo = 2

//$refs使用: 父组件
<template>
  <div>
  	<my-component ref="childrenCompA"></my-component>
		<my-component ref="childrenCompB"></my-component>
  </div>
</template>
<script>
    export defalut {
      methods: {
        getMsg(){
          return this.$refs.childrenCompA.msg + this.$refs.childrenCompB.msg
        }
      }
    }
</script>
```
### 4、provide/inject
隔代通讯：祖先组件通过provide来提供变量，然后在子孙组件中通过inject来注入变量。provide/inject主要解决了跨级组件间的通信问题，不过主要使用场景为子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。
- provide选项是一个对象或者返回一个对象的函数，该对象包含可注入其子孙的属性。
- inject选项是一个字符串数组或一个对象
- provide和inject绑定不是可响应式的，但传入的可监听对象的property仍然可响应
```vue
 <!-- 父组件 -->
<template>
	<com-a></com-a>
</template>
<script>
  import ComA from './a'
  export default {
    name: 'home',
    components: {
      ComA
    },
    /*
    provide:{
    	'a': 'Hello',
      'show': val => !val
    }
    */
    provide(){
      return {
        'a': 'Hello',
        'show': val => !val
      }
    }
  }
</script>

<!-- 子组件 -->
<template>
	<div>
    <button @click="showFn">{{a}}</button>
  </div>
</template>
<script>
  import ComA from './a'
  export default {
    /*
    inject:{
    	a_child: 'a',
      show_child: 'show'
    }
    */
    inject:['a', 'show'],
    methods:{
      showFn(){
        this.show('xxx')
      }
    }
  }
</script>
```
### 5、$attrs/$listeners
隔代通讯
- $attrs：存放的是父组件中绑定的非Props属性
  - 包含了父作用域中不被prop所识别（且获取）的特性绑定（class和style除外）
  - 当一个组件没有声明任何prop时，这里会包含所有父作用域的绑定（class和style除外）
  - 可以通过v-bind=“$attrs”传入子组件，通常配合inheritAttrs选项一起使用
- $listeners：存放的是父组件中绑定的非原生事件，vue3移除
  - 包含了父作用域中的（不含.native修饰器的）v-on事件监听器
  - 可以通过v-on=“$listeners”传入子组件

```vue
 <!-- 父组件 -->
<template>
  <div>
  	<child-a :name="name" :age="age" :job="job" 
             title="this is a title" @click="console.log("hello")"></child-a>
  </div>
</template>
<script>
  import ChildA from './ChildA'
  export default {
    components:{
      ChildA
    },
    data(){
      return {
        name: 'tao',
        age: "28",
        job: "worker"
      }
    }
  }
</script>

<!-- 子组件 -->
<template>
	<div>
    <child-b v-bind="$attrs" v-on="$listeners"></child-b>
  </div>
</template>
<script>
  import ChildB from "./ChildB"
  export default{
    name: "child-a",
    components: {
      ChildB
    },
    mounted(){
      console.log(this.$attrs) //{name: "tao", age: "28", job: "worker", title: "this is title"}
      this.$listeners.click() //Hello
    }
  }
</script>

<!-- 孙组件 -->
<template>
	<div>
    <p>B-listeners: {{this.$listeners.click()}}</p>
  </div>
</template>
<script>
  export default {
    props: ["name"], //name作为props属性绑定
    mounted(){
      console.log(this.$attrs) //{age: "28", job: "worker", title: "this is title"}
      this.$listeners.click()  //hello
    }
  }
</script>
```
### 6、bus/js对象
组件间通讯
- 事件总线EventBus
  - 通过一个空的vue实例作为中央事件总线，用它来触发事件和监听事件，巧妙而轻量地实现了任何组件间的通信，包括父子、兄弟、跨级通信。注意销毁自定义事件，避免内存泄露。
  - vue3中移除了$on，$off，$once三个vue实例方法，无法使用中央事件总线，可以通过使用外部库来替换。
- 局部js对象
  - 利用esmodule引用特性，声明一个包含属性和方法的对象，在多组件共享，适用于功能复杂且与模块无关的模块开发场景
  - 对象中的数据为非响应式的
```js
//事件总线
let Bus = new Vue();

//componentA
Bus.$emit('add-todo', {text: this.newTodoText})

//componentB
Bus.$on('add-todo', this.addTodo)
Bus.$off('add-todo', this.addTodo) //移除事件

//局部js对象
//shareState.js
const store = {
  state: {
    user: []
  },
  setUsers(users){
    this.state.users = users
  }
}
export default store
//componentA
import shareState from '@/shareState'
export default {
  data(){
    return {
      sharedState: shareState.state
    }
  },
  methods:{
    todo(value){
      shareState.setUsers(value)
    }
  }
}
```
### 7、Vuex
- 组件间通讯
### 8、缓存
- localStorage, sessionStorage
## 三、自定义指令
### 1、指令添加
- 全局添加：Vue.directive(id, [definition])
  - 注册或获取全局指令
  - {string} id
  - {Function | Object} [definition]：指令对象，有5个可选钩子
- 局部添加：组件内directives属性
```js
 //全局指令
Vue.directive('focus', {
  inserted:function(el){
    el.focus()
  }
})
//局部指令
export default {
  directives: {
    focus: {
      inserted: function(el){
        el.focus()
      }
    }
  }
}
//使用
<input v-focus>
```
### 2、钩子函数
```js
//vue2全量钩子函数
{
  bind(){},       
  inserted(){},
  update(){},
  compotentUpdated(){},
  unbind(){}
}

//注意：vue3中钩子api进行了调整，与生命周期靠拢，无法兼容
{
  beforeMount(){}, //bind
  mounted(){},    //inserted
  beforeUpdate(){},
  undated(){}, //componentUpdated
  beforeUnmount(){},
  unmounted(){} //unbind
}

//简写，只想在bind和update时触发相同行为，不关心其他的钩子
Vue.directive('focus', function(el, binding){
  el.style.backgroundColor = binding.value
})
```
- bind：只调用一次，指令第一次绑定到元素时调用，在这里可以进行一次性初始化操作。
- inserted：被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）
- update：所在组件的VNode更新时调用，但是可能发生在其子VNode更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新后的值来忽略不必要的模版更新。
- compotentUpdated：指令所在组件的VNode以及子VNode全部更新后调用。
- unbind：只调用一次，指令与元素解绑时调用。
### 3、钩子函数入参
- el：指令绑定的元素，可以直接用来操作dom
- binding：一个对象，包含如下property：
  - name：指令名，不包含v-前缀
  - value：指令的绑定值，eg：v-xx=”1+2“，value=3
  - oldValue：指令绑定的前一个值，仅在update和componentUpdated钩子中可用，无论值是否改变。
  - expression：字符串形式的指令表达式，eg：v-xx=”1+2“，expression="1+2"
  - arg：传给指令的参数，eg：v-xx:foo，arg=“foo”
  - modifiers：一个包含修饰符的对象，eg：v-xx.foo.bar中，修饰符对象为{foo:true, bar:true}
- vnode：vue编译生成的虚拟节点
- oldVnode：上一个虚拟节点，仅在update和componentUpdated钩子中可用
### 4、指令传参
- 动态指令参数：通过[]传入动态参数
- 对象字面量：传入一个 JavaScript 对象字面量
```js
<div v-demo="{color: 'white', text: 'hello'}"></div>
Vue.directive('demo', function(el, binding){
	console.log(binding.value.color) //"white"
	console.log(binding.value.text)  //"hello"
})

<div id="app">
  <p v-pin:[direction]="200">text</p>
</div>
Vue.direction('pin', {
	bind: function(el, binding, vnode){
		el.style.position = 'fixed'
		var s = (binding.arg == 'left' ? 'left' : 'top')
		el.style[s] = binding.value + 'px'
	}
})
new Vue({
	el: '#app',
  data: function(){
		return {
			direction: 'left'
    }
  }
})
```
### 5、典型案例
```js
//按钮防重自定义指令
Vue.directive('preventClick', {
  inserted(el, binding){
    el.addEventListener('click',()=>{
      if(!el.disabled){
        el.disabled = true
        el.style.cursor = 'not-allowed'
        setTimeout(()=>{
          el.disabled = false
          el.style.cursor = 'pointer'
        }, binding.value || 2000)
      }
    })
  }
})

<el-button v-preventClick="3000">click</el-button>
```
## 四、插槽用法
插槽是Vue组件的一种机制，插槽提供了一个讲内容放置到新位置或组件更通用的出口
### 1、插槽分类
- 具名插槽：通过name指定插槽名字
  - 组件支持多个插槽，组件内未命名的为默认插槽，被隐式命名为default，其他不同的插槽需要显示命名
  - 插槽使用slot组件，name属性命名插槽，父组件使用v-slot指令
  - v-slot指令只能添加在`<template>`上，例外为作用域插槽只有默认插槽情况
- 作用域插槽：通过v-slot指令的值指定作用域变量的名称
  - 有时让插槽内容（父组件）能够访问子组件中才有的数据，为了让子组件的数据/方法能够在父组件的插槽内容中可用，可以将这些数据/方法作为slot元素的属性绑定上去，使用v-slot指令的值指定作用域变量的名称。
```vue
<!-- 具名插槽：子组件 -->
<template>
	<div>
    <h2>
      <slot name="header">Title</slot>
  	</h2>
    <slot>default</slot>
  </div>
</template>

<!-- 具名插槽：父组件 -->
<template>
	<componA>
    <template v-slot:header>
      My name is Jian
		</template>
		<!-- The code below goes into the default slot -->
    <img src="./img.jpg">
  </componA>
</template>
```
```vue
<!-- 作用域插槽：子组件 -->
<template>
	<span>
    <slot v-bind:user="user">
      {{user.lastName}}
    </slot>
  </span>
</template>
<!-- 作用域插槽：父组件 -->
<template>
	<current-user>
    <template v-slot:default="slotProps">
      {{slotProps.user.firstName}}
		</template>
  </current-user>
</template>
<!-- 只有默认插槽的缩写，直接放组件上，无需使用template -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
</current-user>
<!-- 对象解构, #简写 -->
<current-user #default="{user}">
  {{ user.firstName }}
</current-user>
```
### 2、插槽用途
#### 1、组件复用
  - 插槽允许通过html片段或其他组件自定义内容，可以方便的支持自定义内容并提供呢统一的属性。
```vue
<!-- 按钮封装 -->
<template>
	<button>
    <slot>添加</slot>
  </button>
</template>
<!-- 调用：带图标的按钮 -->
<template>
	<my-button>
		<img src="/img.jpg">
  </my-button>
</template>

<!-- 尾部添加按钮关闭弹框 -->
<template>
	...
	<div class="modal-footer">
    <slot name="footer" :closeModal="closeModal"></slot>
  </div>
</template>
<script>
  export default {
    methods: {
      closeModal(){/* */}
    }
  }
</script>
<!-- 父组件调用 -->
<template #footer="{closeModal}">
	<button @click="closeModal">
    关闭对话框
  </button>
</template>

```
#### 2、无渲染组件

利用插槽，可以创建无渲染组件，用于业务逻辑和视图的解耦：只提供函数而不渲染自己html模版的组件。数据和事件以及dom元素内容全部由父组件的插槽内容提供。
  - 数据和事件：作用域插槽可以将数据和事件从子组件传递给父组件，这就相当于对外暴露了接口。
  - dom元素：将 HTML 中的 DOM 以及 CSS 交给父组件（调用方）去维护，子组件通过 `<slot>` 标签插入。
```vue
<!-- 两组件，业务逻辑相同，视图不同，利用插槽剥离业务逻辑代码进行复用 -->
<!-- 子组件：业务逻辑代码，开关切换 -->
<template>
	<div class="toggle-container">
    <slot :currrentState="currentState" :setOn="openState" 
          :setOff="closeState" :traggle="toggle"></slot>
  </div>
</template>
<script>
  export default {
    props: {
      state: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        currentState: this.state
      }
    },
    methods: {
      openState(){
        this.currentState = true
      },
      closeState(){
        this.currentState = false
      },
      toggle(){
        this.currentState = !this.currentState
      }
    }
  }
</script>

<!-- 父组件调用：通过作用域插槽调用子组件函数，通过插槽传递dom元素 -->
<template>
	...
  <template v-slot:default="{currentState, setOn, setOff, toggle}">
    <button @click="toggle">切换</button>
    <button @click="setOn">打开</button>
    <button @click="setOff">关闭</button>
    <div v-if="currentState">已打开</div>
    <div v-else>已关闭</div>
  </template>
</template>

<!-- 无渲染组件：使用render去除模版，使用this.$scopedSlots（作用域插槽）属性替代slot组件 -->
<script>
  export default {
    props: {
      state: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        currentState: this.state
      }
    },
    //(createElement: () => VNode) => VNode
    /* render: function (createElement) {
  			return createElement('h1', this.blogTitle)
		}*/
    render(){
      return this.$scopedSlots.default({
        currentState: this.currentState,
        setOn: this.openState,
        setOff: this.closeState,
        toggle: this.toggle
      })
    },
    methods: {
      openState(){
        this.currentState = true
      },
      closeState(){
        this.currentState = false
      },
      toggle(){
        this.currentState = !this.currentState
      }
    }
  }
</script>
```
## 五、vue修饰符
### 1、表单修饰符
- v-model.lazy：改变输入框的值时value不会改变，当光标离开输入框时，v-model绑定的值value才会改变
- bv-model.trim：类似于trim()，把v-model绑定的值的首尾空格过滤
- v-model.number：将值转换为数字
  - 先输入数字的话，只取前面数字部分
  - 先输入字母的话，number修饰符无效
- v-bind.sync：对一个prop进行双向绑定的简写，父组件通过绑定属性的方式向子组件传值，而在子组件中可以通过$emit向父组件通信，通过这种间接的方式改变父组件的data，从而实现子组件改变props的值
  - 子组件传递的事件名必须是update:value，其中value必须与子组件中的props中声明的名称完全一致
  - 带有.sync修饰符的v-bind不能和表达式一起使用（可使用计算属性），必须使用要绑定的属性名
```vue {.line-numbers}
<!-- 父组件 -->
<child-com :age="age" @setAge="res => {age = res}"></child-com>
<!-- 子组件 -->
this.$emit('setAge', 18)

<!-- 等价写法 -->
<child-com :age.sync="age"></child-com>
this.$emit('update:age', 18)
```
### 2、事件修饰符
- v-on.stop：阻止事件冒泡，event.stopPropagation()方法
- v-on.prevent：阻止原生事件，event.preventDefault()方法
- v-on.self：点击事件绑定的本身才会触发事件
- v-on.capture：反向冒泡，事件默认是由里往外冒泡，使用.capture修饰符时候，事件触发由外往内捕获
- v-on.passive：当监听元素的滚动事件的时候，会一直触发onscroll事件，在移动端页面会卡顿，使用.passive会直接执行默认行为，不等onscroll事件完成。
  - 常用于监听scoll、touchmove事件使用
  - 每次事件产生，浏览器都会去查询一下是否有preventDefault阻止该次事件的默认动作，通过passive将内核线程查询跳过，可以大大提升滑动的流畅度
  - passive和prevent冲突，不能同时绑定在一个监听器上
- .native：在某个组件的根元素上监听一个原生事件。一般将事件绑定用在html原生标签**，**在组件标签上使用的时候，就要加上native修饰符，这样就可以像原生标签一样使用事件绑定
```vue
<!-- 执行顺序：1，2，4，3 -->
<div @click.capture="shout(1)">
  obj1
  <div @click.capture="shout(2)">
    obj2
  	<div @click="shout(3)">
      obj3
  		<div @click="shout(4)">obj4</div>
    </div>
  </div>
</div>

<!-- 滚动事件的默认行为（即滚动行为）将会立即触发，不会等待onScroll完成 -->
<!-- 其中包含event.preventDefault()情况 -->
<div v-on:scroll.passive="onScroll">滑动</div>

<!-- myself-button 可绑定click事件，类似button -->
<myself-button @click.native="add('组件标签，包含native的点击')" /></myself-button>
```
### 3、鼠标按键修饰符
- @click.left：鼠标左键
- @click.right：鼠标右键
- @click.middle：鼠标中键
### 4、键值修饰符
- @keydown/@keyup：键盘事件监听
  - 按键码：.enter/.tab/.delete/.space等
  - 系统修饰键：.ctrl/.alt/.shift/.meta
  - .exact：控制精确的系统修饰符组合触发的事件
```vue
<button @keyup.enter="submit">key为Enter时触发</button>
<div @click.ctrl="submit">ctrl + click时触发</div>
<button @click.ctrl.exact="submint">有且只有ctrl被按下时触发</button>
<button @click.exact="submint">没有任何系统修饰符被按下时触发</button>
```
## 六、特殊组件
1、动态组件
- component组件配合is属性进行组件动态切换
  - 属性is：可以为组件名字或组件对象
- 使用keep-alive组件动态组件：用于保留组件状态或避免重新渲染
  - include：字符传或正则，名称匹配的组件被缓存
  - exclude：字符传或正则，名称匹配的组件不被缓存
  - max：缓存最大组件数目
```vue
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
import compA from './compA'
import compB from './compB'
export default {
	data(){
		return {
			currentTabComponent: compA  			//组件对象
			//currentTabComponent: 'tab-home' //组件名字
		}
  },
  components: {
		"tab-home": {
        template: "<div>Home component</div>"
     }
  }
}

<!-- 基本 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>

<!-- 多个条件判断的子组件 -->
<!-- if值变化时，comp-a和comp-b不会重新渲染，执行全部生命周期 -->
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>
```
### 2、异步组件
组件拆分，异步加载使用：以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义，Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。
```js
/* 全局定义异步组件 */
Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)

/* 局部定义异步组件  */
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})

/* 完整的工程函数  */
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```
### 3、函数式组件
无状态 (没有响应式数据)，也没有实例 (没有 this 上下文)，接受props数据。
```js
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // `render` 函数返回虚拟节点使它们渲染的代价更小
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})
```

