# react
## 基础
### 1.JSX
- 合法的jsx元素
    - 普通的dom标签，如div/p/span等
    - 申明的react组件，例如通过class或者函数创建的jsx组件，用户定义的组件必须以大写字母开头
    - false、null、undefined、true为合法元素，不会渲染
    - 字符串（最终会渲染一个text节点）
    - 数字类型，最终会渲染出来
```js
{false && (<p>test</p>)} {/* 渲染空元素 */}
{0 && (<p>true</P>)}   {/* 与门如果出现非布尔值，渲染与预期有出入，渲染出0 */}
{0 ? null : (<p>true</P>)} {/* 建议使用三目运算符 */}
```
- 语法
  - {}使用js表达式：三目运算符、执行函数、数据map等
  - class/for这类html属性是关键字，使用className、htmlFor的形式来定义
  - props默认值为true
  - 点语法，一个模块导出多个组件，可以使用点语法直接使用
  - 注释：{/* xxx */}
```js
//点语法
import React from 'react';
const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Imagine a {props.color} datepicker here.</div>;
  }
}
function BlueDatePicker() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <MyComponents.DatePicker color="blue" className="text" {...props}/>;
}

//动态组件
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  const SpecificStory = components[props.storyType];
  return (
          <SpecificStory story={props.story}
                         onClick={() => console.log("clicked!")}/>
  );
}
```
- 语法
  - 本质为React.createElement(component, props, ...children)函数的语法糖
  - babel-plugin-transform-react-jsx插件，可以将 jsx 编译为 react 的内部⽅法createElement
### 2.函数组件和class组件
在react中，可以使用class形式或是函数的形式来创建一个组件：
```js
//函数组件
function Foo(props) { 
  return (
    <div>{ props.text || 'Foo'}</div>
  ); 
}

//类组件
class Bar extends React.Component {
	render() {
		return (
			<div>{this.props.text || 'Bar'}</div>
 		);
	} 
}
```
两种组件的区别：
- 加载的 props ⽅式不同，函数式定义组件从组件函数的参数加载；class 形式的组件通过 this.props 获取传⼊的参数
- 函数式组件⽐较简单，内部⽆法维护状态；class 形式内部可以通过 this.state 和 this.setState ⽅法定义和更新内部state ，同时更新 render ⾥⾯的函数渲染的结果
- class 组件内部可以定义更多的⽅法在实例上，但是函数式组件⽆法定义
- class组件需要使用new实例化，函数组件直接使用
### 3.有/无状态组件
#### 有状态组件
- 特点
  - 是类组件
  - 有继承
  - 可以使用this
  - 可以使用react的生命周期
  - 使用较多，容易频繁触发生命周期钩子函数，影响性能
  - 内部使用 state，维护自身状态的变化，有状态组件根据外部组件传入的 props 和自身的 state进行渲染

- 使用场景
  - 需要状态的
  - 需要使用状态操作组件的，（无状态组件的也可以实现，通过新版本react hooks也可实现）
- 总结
  - 类组件可以维护自身的状态变量，即组件的 state ，类组件还有不同的生命周期方法，可以让开发者能够在组件的不同阶段（挂载、更新、卸载）对组件做更多的控制。类组件则既可以充当无状态组件，也可以充当有状态组件。当一个类组件不需要管理自身状态时，也可称为无状态组件
#### 无状态组件
- 特点
  - 不依赖自身的状态state
  - 可以是类组件或者函数组件。
  - 可以完全避免使用 this 关键字（由于使用的是箭头函数事件无需绑定）
  - 有更高的性能，当不需要使用生命周期钩子时，应该首先使用无状态函数组件
  - 组件内部不维护 state ，只根据外部组件传入的 props 进行渲染的组件，当 props 改变时，组件重新渲染。
- 使用场景
  - 组件不需要管理 state，纯展示
- 优点
  - 简化代码、专注于 render
  - 组件不需要被实例化，无生命周期，提升性能。 输出（渲染）只取决于输入（属性），无副作用
  - 视图和数据的解耦分离
- 缺点
  - 无法使用 ref
  - 无生命周期方法
  - 无法控制组件的重渲染，因为无法使用shouldComponentUpdate 方法，当组件接受到新的属性时则会重渲染
- 总结
  - 组件内部状态且与外部无关的组件，可以考虑用状态组件，这样状态树就不会过于复杂，易于理解和管理。当一个组件不需要管理自身状态时，也就是无状态组件，应该优先设计为函数组件，比如自定义的 Button、Input等组件
### 4.受控组件和非受控组件
  - 受控组件：表单数据是由 React 组件来管理的，推荐使用
  - 非受控组件：表单数据将交由 DOM 节点来处理，可以通过ref获取表单中数据
```js
//受控组件
class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
    );
  }
}

//非受控组件
class Form extends Component {
  handleSubmitClick = () => {
    const name = this._name.value;
    // do something with `name`
  }

  render() {
    return (
      <div>
      	{/* defaultValue为初始值，通过ref可获取input值 */}
        <input type="text" ref={input => this._name = input} defaultValue="Jian"/>
        <button onClick={this.handleSubmitClick}>Sign up</button>
      </div>
    );
  }
}
```
### 5.组件生命周期
class组件中，可申明如下生命周期：
#### 老版本
- componentWillMount：在新节点插入DOM结构之前触发
  - render：componentWillMount和componentDidMount之间触发
- componentDidMount：在新节点插入DOM结构之后触发 
  - 初始化请求最好在componentDidMount中发送请求，之前是服务器渲染阶段，不适合发送请求；请求中可能有操作dom操作，会出现问题。客户端发送请求api最好放在服务器不会渲染的方法里，在组件挂载至dom元素后再进行请求更新
- componentWillUnMount：在组件从DOM中移除时立即触发
- componentWillReceiveProps：已加载的组件收到新的参数时调用，只有props参数更新时才会触发
- shouldComponentUpdate：组件判断是否重新渲染时调用，返回false取消更新组件，不会调用render
- componentWillUpdate：当你的组件再次渲染时，在render方法前调用（在组件的props或者state发生改变时会触发该方法）
- componentDidUpdate：在render函数执行完毕，且更新的组件已被同步到DOM后立即调用，该方法不会在初始化渲染时触发

加载顺序
- 首次加载时：componentWillMount -> render -> componentDidMount
- 参数变化时：componentWillReceiveProps(props参数变化) -> shouldComponentUpdate -> componentWillUpdate -> render -> componentDidUpdate
- 组件卸载：componentWillUnMount
#### 新版本
![An image](/storm.github.io/react-lifecycle.png)
- static getDerivedStateFromProps(props, state)：在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。条件： state 的值在任何时候都取决于 props
- getSnapshotBeforeUpdate()：在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 componentDidUpdate()
- static getDerivedStateFromError(error)：会在后代组件抛出错误后被调用 ，它将抛出的错误作为参数，并返回一个值以更新 state
- componentDidCatch(error, info)：在后代组件抛出错误后被调用，用于记录错误之类的情况：

加载顺序：
- 挂载时：constructor() -> static getDerivedStateFromProps() -> render() -> componentDidMount()
- 更新时：static getDerivedStateFromProps() -> shouldComponentUpdate()
-> render() -> getSnapshotBeforeUpdate() -> componentDidUpdate()
- 卸载时：componentWillUnmount()
- 错误处理：当渲染过程，生命周期，或子组件的构造函数中抛出错误时 static getDerivedStateFromError() -> componentDidCatch()

### 6.事件代理
react中的事件使用事件代理，采用全局单例的event对象，用于跨端、兼容性和性能提升，异步操作最好将对象内部需要的值进行拷贝，否则会导致this指向问题。
```js
import React, {Component} from 'react';
class App extends Component {
  clickHandle1(e){
    setTimeout(function(){
      console.log('button1 click', e.currentTarget.innerText);
    }, 1000)
  }
  clickHandle2(e){
    console.log('button2 click', e.currentTarget.innerText);
  }
  render(){
    return (
      <div className="App">
        {/* click1报错，click2输出button2 */}
        {/* 解决方法：
        		clickHandle1(e){
        		  let text = e.currentTarget.innerText;
              setTimeout(function(){
                console.log('button1 click', text);
              }, 1000)
            }
         */}
        <button onClick={this.clickHandle1}>button1</button>
        <button onClick={this.clickHandle2}>button2</button>
      </div>
    )
  }
}
```
### 7.immutable和immer
1.函数引用：render函数中，使用箭头函数或者bind向子组件传递函数时，每次会重新创建函数，导致子组件进行渲染，影响性能，建议写入constructor里或外部提取使用箭头函数
```js
class App extends React.Component>{
  constructor(props){
    super(props);
    this.state = {
      num: 1,
      title: "Jian"
    }
    //推荐写法1，在constructor中使用bind
    this.handleClick2 = this.handleClick1.bind(this);
  }
  
  handleClick1(){
    this.setState({
      num: this.state.num + 1
    })
  }
	//推荐写法2，使用箭头函数绑定
  handleClick3 = () => {
    this.setState({
      num: this.state.num + 1
    })
  }
	
  render(){
    return (
      <div>
      {/* 不推荐写法 */}
			<ChildComponent onClick={this.handleClick1.bind(this)}></ChildComponent>
			<ChildComponent onClick={()=> this.handleClick1()}></ChildComponent>
					
			{/* 考点1解决方法：提取函数 */}
			<ChildComponent onClick={this.handleClick2}></ChildComponent>
			<ChildComponent onClick={this.handleClick3}></ChildComponent>
      </div>
    )
  }
}
```
2.对象引用：传递给子组件对象时，使用深拷贝会引起的对象的引用断裂，等价于每次传入子组件中的对象为新对象，导致子组件重新渲染，可使用immutable库或者immer类库避免，可配合 shouldComponentUpdate 进行追踪，来进⾏性能优化
```js
//immutable库使用
const immutable = require('immutable')
const data = {
  key1: 'test1'，
  key2: 'test2'
}
const a = immutable.fromJS(data);//转换为内置对象，
const b = a.set('key1', 'valueb');
console.log(a.key1 === b.key1);  //false
console.log(a.key2 === b.key2);  //true

//immer库使用
const produce = require('immer')
const state = {
  key1: 'test1'，
  key2: 'test2'
}
const newState = produce(state, (draft) => {
  draft.key1 = 'newKey1';
})
console.log(newState.key1 === state.key1);  //false
console.log(newState.key2 === state.key2);  //true
```
## 进阶
### 1.hooks优势
- class的缺点
  1. 组件间的状态逻辑很难复用
     - 组件间如果有state的逻辑是相似的，class模式下基本使用高阶组件来解决。虽然能够解决问题，但是我们需要在组件外部再包一层元素，会导致层级非常冗余。
  2. 复杂业务的有状态组件会越来越复杂
  3. 监听和定时器的操作，被分散在多个区域：多个生命周期函数中存在同一业务逻辑，逻辑分散
  4. this指向问题
```js
class App extends React.Component<any, any>{
  constructor(props){
    super(props);
    this.state = {
      num: 1,
      title: "Jian"
    }
    this.handleClick2 = this.handleClick1.bind(this);
  }
  
  handleClick1(){
    this.setState({
      num: this.state.num + 1
    })
  }

  handleClick3 = () => {
    this.setState({
      num: this.state.num + 1
    })
  }
	
  render(){
    return (
      <div>
      {/* 考点1: render里bind每次都会返回一个新的函数，造成ChildComponent每次会重新渲染 */}
			<ChildComponent onClick={this.handleClick1.bind(this)}></ChildComponent>
			<ChildComponent onClick={()=> this.handleClick1()}></ChildComponent>
					
			{/* 考点1解决方法：提取函数 */}
			<ChildComponent onClick={this.handleClick2}></ChildComponent>
			<ChildComponent onClick={this.handleClick3}></ChildComponent>
      </div>
    )
  }
}
```
- hooks的优点
  1. 利用业务逻辑的封装和拆分，可以非常自由的组合各种定义hooks（自己封装的用到的hooks的逻辑）
  2. 可以在无需修改组件结构的情况下，复用状态逻辑
  3. 定时器、监听等都被聚合到同一块代码下
### 2.注意事项
  1. 只能在函数内部的最外层调用hook，不要在循环、条件判断或者子函数中调用。
  2. 只能在react的函数组件中调用hook，不要在其他的js函数里调用
     
面试题：
1. 为什么不能在循环、条件判断中调用？状态实现是使用单项列表，在循环和条件中调用，会使状态偏移。
2. 为什么useEffect的第二个参数是空数组，就相当于componentDidMount只执行一次？
3. 子定义的hook怎样操作组件的？

手写代码实现useState
```js
import React from 'react';
import ReactDom from "react-dom";

//使用方法
function Counter(){
  const [count, setCount] = useState(0);
  const onClick = () => {
    setCount(count + 1)
  }
  
  //扩展使用多个state
  const [name, setName] = useState('');
  const onClickName = () => {
    setName(`${name} ${Math.random()}`)
  }
  
  return (
    <div>
    	<div>{{count}}</div>
			<button onClick={onClick}>click</button>
			<div>{{name}}</div>
			<button onClick={onClickName}>click</button>
    </div>
  )
}

//手写useState，返回数组
//实际实现是使用单项链表，不是数组
let state: any[] = []; 
let cursor = 0;
function useState<T>(initialState: T): [T, (newState: T) => void] {
   const currentCursor = cursor;
   state[currentCursor] = state[currentCursor] || initialState;
   function setState(newState: T){
     state[currentCursor] = newState;
     render();
   }
	 cursor++;
   return [state[currentCursor], setState];                                
}

//替代原app.js中的render方法
export function render(){
  ReactDom.render(
    <React.StrictMode>
    	<Counter/>
    </React.StrictMode>
    document.getElementById("root");
  )
  //当渲染完成时，清空
  cursor = 0;
}
```
手写代码实现useEffect
```js
import React from 'react';
import ReactDom from "react-dom";

//使用方法
function CounterEffect(){
  effectCursor = 0; //初始清空
  const [count, setCount] = useState(0);
  const onClick = () => {
    setCount(count + 1)
  }
  const [count1, setCount1] = useState(0);
  const onClick1 = () => {
    setCount1(count1 + 1)
  }
  
  //用法：入参两参数：回调，依赖项(空数组时只在组件加载时执行一次)
  useEffect(() => {
    console.log(`count 发生了改变 ${count}`)
  }, [count])
  useEffect(() => {
    console.log(`count1 发生了改变 ${count1}`)
  }, [count1])
  
  return (
    <div>
    	<div>{{count}}</div>
			<button onClick={onClick}>click</button>
			<div>{{count1}}</div>
			<button onClick={onClick1}>click1</button>
		</div>
  )
}

//手写useEffect
const allDeps = Array <any[] | undefined> = [] //二维数组
let effectCursor: number = 0;
function useState(callback:()=>void, depArray?: any[]){
   if(!depArray){
     callback();
     allDeps[effectCursor] = depArray;
     effectCursor++;
     return;
   }
  
  //本次依赖项和上一次存储依赖项数组对比，是否有变化
   const deps = allDeps[effectCursor];
   const hasChanged = deps 
   		? depArray.some((el, i) => el !== deps[i]) 
   		: true;
  
   if(hasChanged){
     callback();
     allDeps[effectCursor] = depArray;
   }
   effectCursor++；
}

//替代原app.js中的render方法
export function render(){
  ReactDom.render(
    <React.StrictMode>
    	<CounterEffect/>
    </React.StrictMode>
    document.getElementById("root");
  )
}
```
### 3.常用api
useState使用状态
```js
import React, {useState, Component} from 'react';
class Temp extends Component{
  state = {
    count: 0
  }
  render(){
    return (
      <div>
        {this.state.count}
        <button onClick={()=>{
            this.setState({
              count: this.state.count + 1
            })
          }}>+</button>
      </div>
    )
  }
}

//hooks写法
const Temp = () => {
  const [count, setCount] = useState(0); //初始值为0
  return (
    <div>
      {count}
      <button onClick={()=>{setCount(count+1)}}>+</button>
    </div>
  )
}

//复合值，setValue无法合并对象
const Temp = () => {
  const [counter, setValue] = useState(()=>{
    return {name: 'jian', age: 18}
  });
  return (
    <div>
      {counter.name}{counter.age}
      <button onClick={()=>{setValue({...counter, age: counter.age + 1})}}>+</button>
    </div>
  )
}
```
useEffect 使用生命周期
```js
import React, {useState, useEffect} from 'react';
const Temp = () => {
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);
  
  //Similar to componentDidMount，只执行一次
  useEffect(()=>{
    console.log('useEffect')
  }, [])
  
  //Similar to componentDidMount and componentDidUpdate
  useEffect(()=>{
    console.log('useEffect')
    //返回函数，清楚副作用，componentWillUnmount
    return function xx(){
    }
  })
  
  //Similar to componentDidUpdate，仅在依赖项更新时调用
  useEffect(()=>{
    console.log('useEffect')
  }, [number])
  
  return (
    <div>
      <h1>{number}</h1>
      <h2>{count}</h2>
      <button onClick={()=>{setNumber(number+1)}}>number+</button>
      <button onClick={()=>{setCount(count+1)}}>number+</button>
    </div>
  )
}
```
useReducer 使用reducer保存全局复合数据
```js
import React, {useState, useReducer} from 'react'
const initState = {
  name: 'jian',
  age: 18
}
function reducer(state, action){
  switch(action.type){
    case 'increment':
      return {...state, age: age + 1}
    case 'decrement':
      return {...state, age: age - 1}
    default:
      return state
  }
}

function Temp(){
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <div>
      <h1>{state.name}</h1>
      <h2>{state.age}</h2>
      <button onClick={()=>{dispatch({type: 'increment'})}}>increment</button>
      <button onClick={()=>{dispatch({type: 'decrement'})}}>decrement</button>
    </div>
  )
}

export default Temp;
```
useContext
使用context解决父子数据传递问题：Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法
```js
import React, {useState, useContext} from 'react'
let theme = {
  black: {
    background: "#000",
    color: "#fff"
  },
  pink: {
    background: "#eee",
    color: "#000"
  }
}

const ThemeContext = React.createContext()

//父组件
function App (){
  return <ThemeContext.Provider value={theme.black}>
    <Theme/>
  </ThemeContext.Provider>
}

//子组件
function Theme(){
  const ThemeCo = useContext(ThemeContext);
  return (
    <div style={background: ThemeCo.background, color: ThemeCo.color}>
    </div>
  )
}
export default App;
```
useRef
获取dom元素，类似createRef，返回一个突变的ref对象，对象在组件的生命周期里一直存在
```js
import React, {useRef} from 'react'
function App() {
  const inputRef = useRef()
  const getFoucs = () => {
    inputRef.current.focus();
  }
  return <div>
    <input type="text" ref={inputRef}/>
    <button onClick={getFoucs}>click me</button>
  </div>
}
export dafault App;
```
useCallback
性能优化，缓存方法 (函数)
```js
import React, {useState, useCallback} from 'react'
/* 
解析：父组件更改，Child每次在渲染
使用React.memo包裹可优化，对函数组件进行优化
类似：shouldComponentUpdate和PureComponent
*/
const Child = React.memo((getCount) => {
  return <div onClick={getCount}>child</div>
})

function Parent(){
  const [num, setNum] = useState(0);
  const [val, setVal] = useState("");
  /* 
  未使用useCallback包裹时，val和num变时都渲染 
  使用useCallback包裹时，只有依赖项变动才会渲染
  */
  const getCount = useCallback(() => {
    console.log(num)
  }, [num]}
                               
  return (
    <div>
      <h1>num: {num}</h1>
      <h2>val: {val}</h2>
      <input type="text" onChange={(ev) => {setVal(ev.target.value)}}/>
      <button onClick={()=> {setNum(num + 1)}}>+</button>
      <Child getCount={getCount}/>
    </div>
  )
}
export default Parent;
```
useMemo
缓存计算值，性能优化
```js
import React, {useState, useMemo} from 'react'

const Child = React.memo((getCount) => {
  return <div onClick={getCount}>child</div>
})

function Parent(){
  /* 
  未使用useMemo包裹时，val和num变时都渲染 
  使用useMemo包裹时，只有依赖项变动才会渲染
  */
  const expensive = useMemo(() => {
    let sum = 0;
    for(let i=0; i<num * 100; i++){
      sum += i;
    }
    return sum;
  }, [num]);
  
  return (
    <div>
      <h1>num: {num}</h1>
      <h2>val: {val}</h2>
      <h3>{expensive()}</h3>
      <input type="text" onChange={(ev) => {setVal(ev.target.value)}}/>
      <button onClick={()=> {setNum(num + 1)}}>+</button>
      <Child getCount={getCount}/>
    </div>
  )
}
export default Parent;
```
useCustom
使用use开头封装函数，内部使用原hook方法
```js
import React, {useState, useMemo} from 'react'
function useCutDown(init = 60){
  const [count, setCount] = useState(init)
  useEffect(()=>{
    let timer = setInterval(()=> {
      if(count < 1){
        clearInterval(timer)
        return
      }
      setCount(count -1)
    }, 1000)
    return ()=>{
      clearInterval(timer)
    }
  }, [])
  return count
}

function App(){
  let Counter = useCutDown(120);
  return <div>{Counter}</div>
}

export default App;
```

