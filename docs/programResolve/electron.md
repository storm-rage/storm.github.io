# electron项目问题处理
## 序列画布设计思路
所有节点遵循整体从上到下的执行顺序，存在特殊组件则根据特殊策略执行

主体画布改动点
初层画布删除，入口改为从流程图序列组件的编辑按钮进入序列画布
画布删除后，画布功能是否有影响或遗漏
序列组件无法展示特殊组件，如何改动合适，还是维持不变？
首页和设置的画布模式删除，
其它画布模式的数据关联点要处理
流程json文件中的画布模式是否删除等
智能设计增加按钮返回到序列画布或者流程图画布
涉及到的改动
改动可能涉及到的功能问题，
智能模式，序列画布，流程画布等导出功能
目的
降低用户使用成本和学习成本
流程文件扁平化存储
序列特殊组件收缩后在画布的展示，发布、导出屏蔽原来的流程块逻辑
## 特殊组件适配序列画布工作项展开收起
判断文件是否存在、判断元素是否存在、判断目标是否存在、异常组件、循环、遍历，以上组件的嵌套适配
先看交接文档，哪些组件已经适配，哪些问题需要注意并解决
## 序列画布问题待解决
流程画布执行循环，从loop_node锚点连出线，循环执行其后的节点
序列画布模式执行循环时应该默认循环执行循环内的节点，因为在序列中是没有loop_node锚点连线的，
该问题在沉浸式和序列画布模式均存在待解决，可能需要执行器配合修改

2.20号会议改动内容记录
1、candition_data的内容跟propertier中的value内容一致，需要删除candition_data，并把value其下的nodes中的节点信息只保存节点id，把相对应的节点信息存放到跟特殊组件节点同级目录下
2、特殊组件嵌套处理
3、遍历组件适配

## 导出导入流程块
导出需要保存流程块的节点信息，包括id，锚点，定位，属性等，还有流程块内的节点
导入需要分别插入流程块和节点信息
## 发现的问题
智能设计涉及到的问题，
特殊组件内部插入组件方式（插入线显示有问题，拖入有问题），
流程块切换数据未切换，
序列画布遍历组件后连接一个打印则为正常执行遍历内部的节点组件
节点参数编辑，特殊组件内嵌套节点删除等右键功能，执行

配置业务组件，推荐窗口展示，点击后插入对应节点到序列中，对执行器包装为一个点击组件，完成

## 序列画布数据扁平化思路
原因分析：
遍历连线，嵌套节点连线从内部开始执行，
问题：多层嵌套下，中间的嵌套节点尚未插入
遍历注意source的格式是条件锚点的，target节点才是嵌套节点
解决思路：
遍历整个graphdata下的nodes，找到插入起始节点，插入目标，
保存到json时删除各嵌套节点下的nodes

第二方案
扁平化设计思路，主要目标为在初始化画布之前，将sequence的nodes数据处理为之前模式的数据形式，该方案也需要向节点内部递归遍历以处理数据，优点在于遍历顺序相对不那么混乱容易理解，而且初始化方法不用做任何修改

第一层遍历线条
第二层

遍历当前序列所有节点,拿到source和target节点
再一次遍历所有节点，分情况插入节点：

如果source是特殊组件那么target必然是其嵌套节点的第一个，找到并插入target；
如果要插入第二个节点，source可能是普通节点，线从底部连出，
需要找到它的source节点插入在哪了，然后跟着插入（它们都是嵌套节点，而且父节点必然是特殊组件）
# 特殊组件的无限嵌套
组件之间互相嵌套，并且可以嵌套自身无限次
引入自身的时候，常规引入组件的方式会报错组件未注册，此时需要采用另一种方式，在`beforeCreate`中注册
```js
beforeCreate() {
    this.$options.components['ConditionIf'] = require('./condition_if.vue').default
    this.$options.components['ExceptionCatch'] = require('./exceptionCatch.vue').default
    this.$options.components['ProcessIterator'] = require('./processIterator.vue').default
    this.$options.components['ProcessWhile'] = require('./processWhile.vue').default
    this.$options.components['ProcessFold'] = require('./processFold.vue').default
  }
```

# node相关

# 沉浸式模式设计与问题处理
沉浸式设计中：输入文本，不用提示框和确认按钮，默认盖一层输入框即可，不用推荐输入文本组件。
拾取输入框
动态改变输入组件宽高
通过检测输入框拾取焦点或按下回车键确认输入完成

滚动桌面，关闭拾取推荐窗
方案：用户无操作通过鼠标位置是否改变，设置定时器3-5秒控制
问题
用户正常识别元素无操作超时也会执行关闭逻辑
原因：窗口穿透无法获取窗口滚动事件，若关闭窗口穿透则拾取窗口下的网页无法滚动
问题待优化
推荐窗几率出现卡屏，拾取窗口已消失，推荐窗还在，重新开启设计后问题消失，疑似拾取元素出现问题导致
滚动窗口重新根据鼠标位置拾取元素判断并关闭推荐窗，请求次数太多问题优化
## 拾取
2.1.1.2 拾取窗口优化需求
文本，按钮，超链接 ，输入框
自动生成组件
按钮，超链接，

如果拾取到的元素的推荐组件第一个是鼠标单击则不展示推荐窗口，
在拾取穿梭框覆盖一层div，添加点击事件（相应不到？），监听并插入组件，如果鼠标移动关掉div，再拾取重新开启div
如果拾取到输入框
用箭头控制推荐窗口的展开和收起
10.28会议总结技术方案
